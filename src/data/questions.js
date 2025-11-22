export const questions = [
    {
      question: "What is it?",
      ruleset: "Accept anything.",
      llm_instruction: "After PASS, write 6 random words. NO MORE THAN 6 WORDS.",
    },
    {
      question: "Where did your mind just go?",
      ruleset: "User must provide something they were potentially thinking about. Doesn't require a location, just a thought.",
      llm_instruction: "Give a direct statement about your evaluation of the user's answer. NO MORE THAN 6 WORDS.", // No custom behavior
    },
    {
      question: "What is your goal here?",
      ruleset: "User must provide something they are trying to achieve, even if it's vague.",
      llm_instruction: "Judge their goal - feel free to be rude or blunt. NO MORE THAN 6 WORDS.", // No custom behavior
    }
  ];