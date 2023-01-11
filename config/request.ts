import axios from "axios";

const url = "https://api.openai.com/v1/completions";

export default function request(prompt: string, token: string) {
  return axios({
    method: "POST",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      model: "text-davinci-003",
      prompt,
      max_tokens: 1000,
    },
  });
}
