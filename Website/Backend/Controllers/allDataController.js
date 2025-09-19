import FlatData from "../db/FlatModel.js";

export const allDataController = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = 10;
        const startIndex = (page - 1) * limit;

        console.log(`Fetching data for page ${page}, limit ${limit}, startIndex ${startIndex}`);
        
        // Get total count for pagination
        const totalItems = await FlatData.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
        
        // Fetch the data with pagination
        const fetchData = await FlatData.find()
            .skip(startIndex)
            .limit(limit)
            .lean(); // Use lean() for better performance
        
        console.log(`Found ${fetchData.length} properties out of ${totalItems} total`);
        
        // Send response with pagination info
        res.status(200).json({
            flats: fetchData,
            currentPage: page,
            totalPages: totalPages,
            totalItems: totalItems,
            hasMore: page < totalPages
        });
        
    } catch (err) {
        console.error('Error in allDataController:', err);
        res.status(500).json({ 
            message: err.message, 
            error: 'Failed to fetch properties' 
        });
    }
};