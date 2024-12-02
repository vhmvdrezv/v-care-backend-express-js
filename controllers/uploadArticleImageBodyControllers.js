export const uploadArticleImageBodyController = (req, res) => {
    try {
        const imageUrl = `${req.protocol}://${req.get('host')}/media/articleImages/body/${req.file.filename}`;
        res.status(200).json({
            message: "تصویر آپلود شد.",
            data: {
                imageUrl
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}