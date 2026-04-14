import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import SafeImage from "./SafeImage";

interface BlogPostCardProps {
  post: {
    title: string;
    date: string;
    summary: string;
    img: string;
    category?: string;
    readTime?: string;
  };
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <motion.article 
      whileHover={{ y: -15 }}
      className="group space-y-8 bg-white rounded-[60px] p-4 pb-12 hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-brand-gray flex flex-col h-full"
    >
      <div className="aspect-[4/3] bg-brand-gray rounded-[50px] overflow-hidden relative">
        <SafeImage 
          src={post.img} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
          alt={post.title} 
        />
        {post.category && (
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 backdrop-blur-md text-brand-dark px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
              {post.category}
            </span>
          </div>
        )}
      </div>
      
      <div className="px-6 space-y-6 flex-grow flex flex-col">
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-black text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-green" />
            {post.date}
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="flex items-center gap-2">
            <Tag size={14} className="text-brand-orange" />
            {post.readTime || "5 min leitura"}
          </div>
        </div>
        
        <h3 className="text-3xl font-display font-black text-brand-dark leading-[1.1] group-hover:text-brand-green transition-colors uppercase tracking-tighter">
          {post.title}
        </h3>
        
        <p className="text-gray-500 text-lg leading-relaxed font-medium line-clamp-3">
          {post.summary}
        </p>
        
        <div className="mt-auto pt-6">
          <motion.button 
            whileHover={{ x: 10 }}
            className="flex items-center gap-3 text-brand-dark font-black text-xs uppercase tracking-widest group-hover:text-brand-green transition-colors"
          >
            Ler artigo completo <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default React.memo(BlogPostCard);
