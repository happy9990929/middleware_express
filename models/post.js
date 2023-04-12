const mongoose = require('mongoose');
// schema 開始
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content 未填寫']
    },
    image: {
      type:String,
      default:""
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
        type: mongoose.Schema.ObjectId, // 抓 id
        ref: "user", // 拉 user model 資料
        required: [true, '貼文 ID 未填寫']
    },
    likes: {
      type:Number,
      default:0
    }
  }
);
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
// schema 結束