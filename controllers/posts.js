const Post = require('../models/post');
const User = require('../models/user');
const successHandler = require('../service/successHandler');
const errorHandler = require('../service/errorHandler');

const posts = {
  async getPosts(req, res) {
    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};

    const post = await Post.find(q).populate({
      path: "user",
      select: "name photo"
    }).sort(timeSort);

    successHandler(res, post);
  },
  async createPosts(req, res) {
    try {
      const { body } = req;
      const { content, user, image, likes } = body;
      const newPost = await Post.create({
        content,
        user,
        image,
        likes
      });
      successHandler(res, newPost);
    } catch (error) {
      errorHandler(res, error);
    }
  },
  async deletePost(req, res) {
    const id = req.params.id;
    const post = await Post.findByIdAndDelete(id);
    successHandler(res, post);
  },
  async deletePosts(req, res) {
    await Post.deleteMany({});
    successHandler(res, []);
  },
  async editPost(req, res) {
    try {
      const id = req.params.id;
      const { body } = req;
      const { content, image, likes } = body;
      const post = await Post.findByIdAndUpdate(id, {
        $set: {
          content,
          image,
          likes,
        },
      });
      successHandler(res, post);
    } catch (error) {
      errorHandler(res, error);
    }
  },
};

module.exports = posts;
