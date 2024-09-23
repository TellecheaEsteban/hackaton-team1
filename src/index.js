import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



async function makeRequest() {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Who won the world series in 2020?"},
                {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
                {"role": "user", "content": "Where was it played?"}],
            model: "gpt-4o-mini",
          });
  
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error("Error con la API de OpenAI:", error);
    }
}

makeRequest();



