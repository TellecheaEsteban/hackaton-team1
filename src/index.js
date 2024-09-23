import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: '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',
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



