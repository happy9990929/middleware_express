const Post = require('../models/post');
const User = require('../models/user');
const successHandler = require('../service/successHandler');
const appError = require('../service/appError');

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

  async createPosts(req, res, next) {
    if(req.body.content == undefined){
      return next(appError(400,"你沒有填寫 content 資料"))
    }

    const { body } = req;
    const { content, user, image, likes } = body;

    const newPost = await Post.create({
      content,
      user,
      image,
      likes
    });
    successHandler(res, newPost);
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
  },
};

module.exports = posts;
