const axios = require('axios');

require('dotenv').config();

const checkOpenAi = function(taskString) {
  const task = taskString.replace("%20", " ");

  const prompt = `
  Prompt: Categorize the following task into "to watch", "to read", "to eat" or "to buy" and respond only with the category.
  Input: "${task}"
  Category:
  `;

  const conversation = [
    { role: 'system', content: "You've come to the right place! I'm here to help you categorize tasks into 'to watch,' 'to read,' 'to eat,' or 'to buy.' Please provide the task you'd like to categorize." },
    { role: 'user', content: prompt },
  ]

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.AI_API}`
  };

  const payload = {
    messages: conversation,
    max_tokens: 5000,
    model: "gpt-3.5-turbo-16k"
  };

  return axios.post('https://api.openai.com/v1/chat/completions', payload, {headers: headers})
    .then(response => {
      let result = response.data.choices[0].message.content.trim().toLowerCase();
      result = result.split(' ');
      const category = result[1];
      const validCategories = ["watch", "eat", "read", "buy"];

      if (validCategories.includes(category)) {
        return category;
      } else {
        return null;
      }
    })
    .catch(error => {
      console.log("Error", error.response ? error.response.data : error.message);
    });
};

module.exports = { checkOpenAi };

