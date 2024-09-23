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

async function palletOptimization(SKUList) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{"role": "system", "content": "Sos un experto en operacion logistica"},
                {"role": "user", "content": "Necesito ayuda para optimizar mis preparaciones de pedidos"},
                {"role": "assistant", "content": "Claro, puedo ayudarte con eso. ¿Cuál es tu pregunta?"},
                {"role": "user", "content": `Necesito que me respondas siempre en formato JSON y con este formato: 
                    {
                        "total_pallets": 2,
                        "pallets": [
                            {
                                "pallet_id": 1,
                                    "levels": [
                                    {
                                        "level": 1,
                                        "products": [
                                        {
                                            "name": "Producto A",
                                            "dimensions": {"largo": 600, "ancho": 400, "alto": 200},
                                            "location": {"x": 0, "y": 0}
                                        },
                                        {
                                            "name": "Producto B",
                                            "dimensions": {"largo": 600, "ancho": 400, "alto": 300},
                                            "location": {"x": 600, "y": 0}
                                        }
                                        ],
                                        "total_height": 400
                                    },
                                    {
                                        "level": 2,
                                        "products": [
                                        {
                                            "name": "Producto C",
                                            "dimensions": {"largo": 1200, "ancho": 900, "alto": 300},
                                            "location": {"x": 0, "y": 0}
                                        }
                                        ],
                                        "total_height": 300
                                    }
                                    ],
                        "total_pallet_height": 700
                        }
                        ]
                    }`
                },
                {"role": "user", "content": `Optimiza el armado de uno o más pallets basado en las siguientes especificaciones: 
                    1. Dimensiones del pallet: ${process.env.PALLET_LENGTH} cm (largo) x ${process.env.PALLET_WIDTH} cm (ancho). 
                    2. Capacidad máxima de carga: ${process.env.PALLET_MAXIMUM_QUANTITY} kg. 
                    3.Altura máxima de carga: ${process.env.PALLET_HEIGHT} cm (incluyendo la altura del pallet). 
                    La lista de productos ${SKUList} contiene las dimensiones, peso, volumen y fragilidad de cada artículo. 
                    Devuélveme una recomendación de cómo organizar los productos en uno o más pallets, especificando:
                    1. Cuántos niveles se pueden formar en cada pallet. 
                    2. Qué productos van en cada nivel y su ubicación. 
                    3. Cuántos pallets en total se necesitan, basados en la capacidad máxima de peso, volumen y altura del pallet. 
                    La respuesta debe estar en el mismo formato que te pase anteriormente. NO quiero que me respondas nada mas, solo con el JSON bien definido.`}],
            model: "gpt-4o-mini",
            });

            return console.log(completion.choices[0].message.content);
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



