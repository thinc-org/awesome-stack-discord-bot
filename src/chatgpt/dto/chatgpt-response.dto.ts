export type ChatGPTResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatGPTChoice[];
  usage: ChatGPTUsage;
};

export type ChatGPTChoice = {
  index: number;
  message: ChatGPTMessage;
  finish_reason: string;
};

export type ChatGPTMessage = {
  role: string;
  content: string;
};

export type ChatGPTUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};
