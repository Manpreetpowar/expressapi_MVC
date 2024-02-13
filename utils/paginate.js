const paginate = async (model, query, page=1, pageSize=10) => {
    try {
        const skip = (page - 1) * pageSize;
        const items = await model.find(query)
                .skip(skip)
                .limit(pageSize);
        const totalItems = await model.countDocuments(query);
        const totalPages = Math.ceil(totalItems / pageSize);
        
        const pagination = {
            currentPage : page,
            pageSize:pageSize,
            totalItems:totalItems,
            totalPages:totalPages
        };

        return {items, pagination};

    } catch (error) {
        throw error;
    }
}

module.exports = {paginate};