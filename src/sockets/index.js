const PostService = require('../services/post.services');

class Sockets {
  constructor(io) {
    this.io = io;
    this.postServices = new PostService();

    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      socket.on('new-post', async ({ id }) => {
        try {
          const post = await this.postServices.findPost(id);

          const newPost = await this.postServices.downloadImgPost(post);
          socket.broadcast.emit('reder-new-post', newPost);
        } catch (error) {
          throw new Error(error);
        }
      });
    });
  }
}

module.exports = Sockets;
