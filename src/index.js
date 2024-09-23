import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

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

export async function palletOptimization(SKUList) {    
    try {        
        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are an expert in logistics operations."},
                {"role": "user", "content": "I need help optimizing my order preparations."},
                {"role": "assistant", "content": "Sure, I can help with that. What’s your question?"}, 
                {"role": "user", "content": `Optimize the assembly of one or more pallets based on the following specifications: \n1. Pallet dimensions: ${process.env.PALLET_LENGTH} cm (length) x ${process.env.PALLET_WIDTH} cm (width). \n2. Maximum load capacity: ${process.env.PALLET_MAXIMUM_WEIGHT} kg. \n3. Maximum load height: ${process.env.PALLET_HEIGHT} cm (including the height of the pallet). \nThe product list ${JSON.stringify(SKUList)} contains the dimensions, weight, volume, fragility (A, B, C) of each item. \nPlease provide a recommendation on how to organize the products into one or more pallets, specifying:\n1. How many levels can be formed in each pallet.\n2. Which products are in each level, including their names, dimensions, and locations within the pallet.\n3. How many pallets are needed in total, based on maximum weight, volume, and height capacity.\nDO NOT provide any additional information, just the properly formatted JSON.`},
                {"role": "user", "content": "I need you to always respond in JSON format with the following structure:\n{\n    \"total_pallets\": 2,\n    \"pallets\": [\n        {\n            \"pallet_id\": 1,\n            \"levels\": [\n                {\n                    \"level\": 1,\n                    \"products\": [\n                        {\n                            \"name\": \"Product A\",\n                            \"dimensions\": {\"length\": 600, \"width\": 400, \"height\": 200},\n                            \"location\": {\"x\": 0, \"y\": 0},\n                            \"quantity\": x\n                        }\n                    ],\n                    \"level_1_height\": y\n                }\n            ],\n            \"total_pallet_height\": z\n        }\n    ]\n}"},
                {"role": "user", "content": "Instructions to consider (mandatory):\n1. Always accommodate the total quantity of each SKU in the list; ensure all stock is used.\n2. The least fragile items (C) should be placed on the lowest level of the pallets, while the most fragile items (A) should be placed on the highest level.\n3. It must be optimized as much as possible; therefore, you can mix SKUs on a pallet.\n4. Level 1 is the lowest level of the pallet, where the least fragile and heaviest items should go. Each pallet can have a maximum of 3 levels.\n5. All dimensions are in cm.\n6. Given the pallet dimensions and all items provided, do not exceed the limits. It should be optimized as much as possible.\n7. When the total area of the items exceeds the allowed area of the pallet, stack the items. The height of each level should reflect the cumulative height of the stacked items.\n8. Consider the height, width, and length of the items, as well as their weight, and compare them with the total pallet limits.\n9. level_x_height is the height of each level, reflecting the stacked height when necessary.\n10. You can use n pallets; just ensure it’s optimized and all items are included.\n11. The height of each pallet should reach the maximum allowed height."}
            ]
            
            ,            
            model: "gpt-4o-mini",
            });

            return completion.choices[0].message.content;
        } catch (error) {
        console.error("Error con la API de OpenAI:", error);
    }
}

// palletOptimization({
//     "skus": [
//       {
//         "sku": "SKU 001",
//         "weight_kg": 20,
//         "length_cm": 50,
//         "width_cm": 30,
//         "height_cm": 40,
//         "fragility": "Baja",
//         "volume_cm3": 60000
//       },
//       {
//         "sku": "SKU 002",
//         "weight_kg": 15,
//         "length_cm": 60,
//         "width_cm": 40,
//         "height_cm": 30,
//         "fragility": "Media",
//         "volume_cm3": 72000
//       },
//       {
//         "sku": "SKU 003",
//         "weight_kg": 10,
//         "length_cm": 40,
//         "width_cm": 30,
//         "height_cm": 50,
//         "fragility": "Alta",
//         "volume_cm3": 60000
//       },
//       {
//         "sku": "SKU 004",
//         "weight_kg": 25,
//         "length_cm": 70,
//         "width_cm": 50,
//         "height_cm": 20,
//         "fragility": "Baja",
//         "volume_cm3": 70000
//       },
//       {
//         "sku": "SKU 005",
//         "weight_kg": 5,
//         "length_cm": 30,
//         "width_cm": 20,
//         "height_cm": 10,
//         "fragility": "Alta",
//         "volume_cm3": 6000
//       },
//       {
//         "sku": "SKU 006",
//         "weight_kg": 8,
//         "length_cm": 40,
//         "width_cm": 40,
//         "height_cm": 40,
//         "fragility": "Media",
//         "volume_cm3": 64000
//       }
//     ]
// })



