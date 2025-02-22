// frontend.js
async function askAI(prompt) {
  try {
    const response = await fetch('http://localhost:3001/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    return await response.json();
  } catch (error) {
    return { error: 'Failed to communicate with AI' };
  }
}
