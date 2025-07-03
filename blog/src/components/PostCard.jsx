import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-blue-800 text-yellow-300 rounded-xl p-4 hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300">
  <div className="w-full justify-center mb-4">
    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="rounded-xl" />
  </div>
  <h2 className="text-xl font-bold">{title}</h2>
</div>
    </Link>
  )
}

export default PostCard
