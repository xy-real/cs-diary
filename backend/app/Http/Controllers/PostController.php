<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $post = Post::all();
        return response()->json([
            'data' => $post
        ]);
    }

    public function store(Request $request)
    {
        // Here you would typically handle the incoming request data,
        // validate it, and save it to the database.
        // For this example, we'll just return a success message.
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:posts',
            'content' => 'required|string',
            'is_published' => 'boolean',
        ]);
        
        $post = Post::create($validated);

        return response()->json([
            'message' => 'Post created successfully!',
            'data' => $post,
        ], 201);
    }

    public function show(Post $post) {
        return response()->json($post);
    }

    public function update(Request $request, Post $post) {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|unique:posts,slug,' . $post->id,
            'content' => 'sometimes|required|string',
            'is_published' => 'sometimes|boolean',
        ]);

        $post->update($validated);

        return response()->json([
            'message' => 'Post updated successfully!',
            'data' => $post,
        ]);
    }

    public function destroy(Post $post) {
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully!',
        ]);
    }
}
