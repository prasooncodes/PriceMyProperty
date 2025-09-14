import FlatData from "../db/FlatModel.js";

export const allDataController = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = 10; // Increased from 2
        const startIndex = (page - 1) * limit;

        console.log(`Fetching data for page ${page}, limit ${limit}, startIndex ${startIndex}`);
        
        const fetchData = await FlatData.find().skip(startIndex).limit(limit);
        
        console.log(`Found ${fetchData.length} properties`);
        
        res.status(200).json(fetchData);
    } catch (err) {
        console.error('Error in allDataController:', err);
        res.status(500).json({ message: err.message, error: 'Failed to fetch properties' });
    }
};