import React, {useState, useEffect} from 'react';
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({categories, slug}) => {
    const [relatedPosts, setrelatedPosts] = useState([]);

    useEffect(() => {
        if(slug) {
            getSimilarPosts(categories, slug)
                .then((result) => setrelatedPosts(result))
        } else {
            getRecentPosts()
                .then((result) => setrelatedPosts(result))
        }
    }, [slug])

    // console.log(relatedPosts);

    return (
        <div className="bg-[#fff] shadow-lg rounded-lg p-8 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">
                {slug ? "Publicaciones similares" : "Publicaciones recientes"}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className="flex items-center w-full mb-4">
                    <div>
                        <img 
                            alt={post.title}
                            height = "60px"
                            width= "60px"
                            className = "align-middle rounded-full"
                            src = {post.featuredImage.url}
                        />
                    </div>
                    <div className='flex-grow ml-4'>
                        <p className='text-gray-400 font-xs'>
                            {moment(post.createdAt).format("DD MMM, YYYY")}
                        </p>
                        <Link key={post.title} href={`/post/${post.slug}`} className="text-md">
                            {post.title}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostWidget