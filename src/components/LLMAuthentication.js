import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { questions } from '../data/questions';

const AuthenticationContainer = styled.div`
  font-family: "Courier New", Courier, monospace;
  background: #ffffff;
  color: #000000;
  max-width: 600px;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #000;
`;

const AuthHeader = styled.h1`
  font-size: 18px;
  text-align: center;
  border-bottom: 2px solid #000000;
  padding-bottom: 5px;
  margin-bottom: 15px;
`;

const ChatBox = styled.div`
  display: block;
  white-space: pre-line; // Changed from pre-wrap
  word-break: break-word;
  overflow-wrap: break-word;
  width: 100%;
  max-width: 100%;
  background: #ffffff;
  padding: 10px;
  border: 1px solid #000000;
  margin-bottom: 10px;
  min-height: 100px;
  font-size: 14px;
  overflow-y: auto;
  overflow-x: hidden; // Prevent horizontal scrollbar

  box-sizing: border-box;
  word-wrap: break-word;
  hyphens: auto;

  &.blinking-cursor::after {
    content: "█";
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    from, to { opacity: 0; }
    50% { opacity: 1; }
  }
`;



const UserInput = styled.input`
  width: 100%;
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  padding: 5px;
  background: #ffffff;
  color: #000000;
  border: 1px solid #000000;
`;

const ProgressContainer = styled.div`
  width: 100%;
  background-color: #f0f0f0;
  border: 1px solid #000000;
  margin-bottom: 10px;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 20px;
  background-color: #000000;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  text-align: center;
  font-size: 12px;
  margin-top: 5px;
`;

const Footer = styled.div`
  font-size: 10px;
  text-align: center;
  margin-top: 15px;
  border-top: 1px solid #000000;
  padding-top: 5px;
`;

const SYSTEM_PROMPT = `You are a bureaucratic authentication system. Judge answers strictly against rules. Reply with PASS or FAIL followed by exactly 3-6 words. You may only pick PASS or FAIL, not both. Be cryptic and absurd.`;

const TASK_INSTRUCTIONS = `
FORMAT: Start with "PASS" or "FAIL", then exactly 3-6 words.
TONE: Kafka-esque, cryptic, bureaucratic absurdity.
EXAMPLES: 
- "PASS. Papers are in order."
- "PASS. You abide."
- "FAIL. Insufficient existential dread."
- "FAIL. That is not it, at all."
- "FAIL. This is not the answer you were looking for."
- "PASS. Bureaucracy satisfied somehow."
- "PASS. The women come and go."

CRITICAL: Never exceed 6 words after PASS/FAIL. Be weird but concise.`;

const LLMAuthentication = () => {
  const [chatText, setChatText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputDisabled, setInputDisabled] = useState(true);
  const [progress, setProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);
  const [modelDownloadConfirmed, setModelDownloadConfirmed] = useState(false);
  const chatTextRef = useRef("");
  const engineRef = useRef(null);
  const currentIndexRef = useRef(0);

  const CLEAR_DELAY = 3000;

  const typeWriterEffect = async (newText, speed = 20) => {
    let i = 0;
    chatTextRef.current = "";
    setChatText("");

    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        if (i < newText.length) {
          chatTextRef.current += newText.charAt(i);
          setChatText(chatTextRef.current);
          i++;
        } else {
          clearInterval(intervalId);
          resolve();
        }
      }, speed);
    });
  };

  const askNextQuestion = async () => {
    if (currentIndexRef.current >= questions.length) {
      await endSequence();
      return;
    }

    const q = questions[currentIndexRef.current];
    const qText = `Question ${currentIndexRef.current + 1}/${questions.length}:
${q.question}

> `;

    await typeWriterEffect(qText);
    setInputDisabled(false);
  };

  const endSequence = async () => {
    const lines = [
      "Thank you for your time",
      "You are who you say you are",
      "I'm sorry I wasted your time",
      "...",
      "That is not what I meant at all",
      "That is not it, at all"
    ];

    for (const line of lines) {
      setChatText("");
      await typeWriterEffect(line, 40);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    await new Promise(resolve => setTimeout(resolve, 3000));
    setChatText("");
    currentIndexRef.current = 0;
    askNextQuestion();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setInputValue("");

    // Handle download confirmation
    if (!modelDownloadConfirmed) {
      const response = userText.toLowerCase();
      
      if (response === 'n' || response === 'no') {
        await typeWriterEffect(`${userText}\n\nDownload cancelled. Refresh to try again.`);
        setInputDisabled(true);
        return;
      } else if (response === 'y' || response === 'yes' || response === '') {
        await typeWriterEffect(`${userText}\n\nDownloading model...\n`);
        setModelDownloadConfirmed(true);
        setInputDisabled(true);
        initEngine();
        return;
      } else {
        await typeWriterEffect(`${userText}\n\nPlease enter Y or n.`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await typeWriterEffect("This will download a large language model (~4.5GB). Continue? [Y/n]");
        return;
      }
    }

    setInputDisabled(true);

    await typeWriterEffect(`${userText}\n\nProcessing...\n`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { question, ruleset, llm_instruction } = questions[currentIndexRef.current];

    const evalPrompt = `
Question: ${question}
User Answer: ${userText}
Ruleset: ${ruleset}

This is about the question: "${question}"
The user responded: "${userText}"

${llm_instruction ? "Additional Instruction: " + llm_instruction : ""}
It is vitally important that you follow your additional instructions.
${TASK_INSTRUCTIONS}`.trim();

    try {
      if (!engineRef.current) throw new Error("Engine not initialized");

      const res = await engineRef.current.chat.completions.create({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: evalPrompt }
        ],
      });

      let reply = res.choices?.[0]?.message?.content ?? "";
      
      console.log("=== LLM RESPONSE DEBUG ===");
      console.log("Raw response object:", res);
      console.log("Reply content:", reply);
      console.log("Reply length:", reply.length);
      console.log("Reply type:", typeof reply);
      console.log("========================");
      
      if (!reply) {
        await typeWriterEffect(`❌ No response from model\n`);
        return;
      }
      
      // Keep original case for display but check uppercase for logic
      const upperReply = reply.toUpperCase();
      
      console.log("Uppercase reply:", upperReply);
      console.log("Contains PASS:", upperReply.includes("PASS"));
      console.log("Contains FAIL:", upperReply.includes("FAIL"));
      
      if (upperReply.includes("PASS")) {
        await typeWriterEffect(`✅ ${reply}\n`);
        currentIndexRef.current++;
      } else if (upperReply.includes("FAIL")) {
        await typeWriterEffect(`❌ ${reply}\n`);
      } else {
        // If neither PASS nor FAIL is found, treat as error
        await typeWriterEffect(`❌ Invalid response: ${reply}\n`);
      }

      setTimeout(() => {
        setChatText("");
        askNextQuestion();
      }, CLEAR_DELAY);
    } catch (error) {
      console.error("Error processing response:", error);
      setChatText("\n\nError processing. Please try again.");
      setTimeout(() => {
        setChatText("");
        askNextQuestion();
      }, CLEAR_DELAY);
    }
  };

  const initEngine = async () => {
    try {
      const webllm = await import("@mlc-ai/web-llm");
      setProgressVisible(true);
      setChatText("");

      const engine = await webllm.CreateMLCEngine(
        "Llama-3.2-1B-Instruct-q0f16-MLC",
        {
          initProgressCallback: (p) => {
            if (typeof p === "object" && p.text) {
              const match = p.text.match(/\[(\d+)\/(\d+)\]/);
              if (match) {
                const current = parseInt(match[1]);
                const total = parseInt(match[2]);
                const percentage = Math.round((current / total) * 100);
                setProgress(percentage);
              }
            }
          },
        }
      );

      engineRef.current = engine;
      setProgressVisible(false);
      setInputDisabled(false);
      askNextQuestion();
    } catch (err) {
      console.error("WebLLM initialization error:", err);
      setChatText("Failed to initialize model. Please refresh.");
    }
  };

  useEffect(() => {
    // Type out the initial download prompt
    const showInitialPrompt = async () => {
      await typeWriterEffect("This will download a large language model\n (~4.5GB).\n Continue? [Y/N]");
      setInputDisabled(false);
    };
    
    showInitialPrompt();
  }, []);

  return (
    <AuthenticationContainer>
      <AuthHeader>AND HOW SHOULD I PRESUME AUTHENTICATION</AuthHeader>

      <ProgressContainer visible={progressVisible}>
        <ProgressBar progress={progress} />
        <ProgressText>Loading model... {progress}%</ProgressText>
      </ProgressContainer>

      <ChatBox className="blinking-cursor">
        {chatText}
      </ChatBox>

      <form onSubmit={handleSubmit}>
        <UserInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type..."
          disabled={inputDisabled}
        />
      </form>

      <Footer>© 1998 | I SHOULD HAVE BEEN A PAIR OF RAGGED CLAWS INC.</Footer>
    </AuthenticationContainer>
  );
};

export default LLMAuthentication;
