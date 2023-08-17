const CHAT_GPT_PROMPT = `I have texts from a website.
Please tell me what the project is, and short description with its highlight in json format
desc should be short, between 15-20 word, must capture the main purpose of the project, also tell what language/stack that work with this project,
some times it's come from github repo (url in first line), if so, the name should be "repoOwner/repoName"
{
"name": "foo",
"desc": "foo is bar",
"tags" :  "backend" | "frontend" | "terminal" | "framework" | "devops" | "deployment" | "auth" | "git" | "ide" | "service" // array of related tag, 3 max, less is better, only the core concept of the project, no space (use slash instead), 15 character max, abbrev only if it's commonly known
}

make sure that your answer don't have anything except json, not even the \`\`\` or \`\`\`json part

`;
export default CHAT_GPT_PROMPT;
