export function useChat() {
  async function handleSendRequest(prompt) {
    try {
      const response = await fetch("http://localhost:8080/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending request:", error);
      throw error;
    }
  }

  return { handleSendRequest };
}
