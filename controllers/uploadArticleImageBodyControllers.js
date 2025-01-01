export const uploadArticleImageBodyController = (req, res) => {
    const imageUrl = `${req.protocol}://${req.get('host')}/media/articleImages/body/${req.file.filename}`;
    res.status(200).json({
        message: "تصویر آپلود شد.",
        data: {
            imageUrl
        }
    });
}