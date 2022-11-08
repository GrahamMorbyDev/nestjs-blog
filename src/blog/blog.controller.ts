import { Controller, Res, Get, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from '../blog/shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService) {}

    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    @Get('post/:postID')
    async getPost(@Res() resizeBy, @Param('postID', new ValidateObjectId()) postID) {
        const post = await this.blogService.getPost(postID);
        if(!post) throw new NotFoundException('Post does not exist!');
        return resizeBy.status(HttpStatus.OK).json(post);
    }

    @Post('/post')
    async addPost(@Res() res, @Body() CreatePostDTO: CreatePostDTO ) {
        const newPost = await this.blogService.addPost(CreatePostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully",
            post: newPost
        })
    }

    @Put('/edit')
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
        @Body() CreatePostDTO: CreatePostDTO
    ) {
        const editedPost = await this.blogService.editPost(postID, CreatePostDTO);
        if(!editedPost) throw new NotFoundException('Post does not exist!')
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }

    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
        const deletedPost = await this.blogService.deletePost(postID);
        if (!deletedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost
        })
    }
}
