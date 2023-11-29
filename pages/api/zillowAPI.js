import axios from "axios";

export default async (req, res) => {
  try {
    const bridgeApiKey = "b9544fe960msh4f49ec1dd048c21p116b1cjsn69374a89a78c";
    const { address } = req.query;

    const zillowApiResponse = await axios.get(
      `https://zillow56.p.rapidapi.com/search?location=${address}`,
      {
        headers: {
          "X-RapidAPI-Key": bridgeApiKey,
          "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
        },
      }
    );

    const data = zillowApiResponse.data;

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching data from Zillow." });
  }
};
