"use client";

import { useEffect, useState } from "react";
// We changed this from "@/lib/sanity" to "../lib/sanity" to fix the module error
import { client, urlFor } from "../lib/sanity";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function Home() {
  // Added basic type safety to fix the 'any' error
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await client.fetch(`*[_type == "book"]`);
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Background Spotlight */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(40,40,40,1)_0%,_rgba(0,0,0,1)_80%)] z-0" />

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <nav className="flex justify-between items-center mb-32 border-b border-white/5 pb-8">
          <h1 className="text-xl font-bold tracking-[0.4em] uppercase opacity-80 text-white">Exclusive Reads</h1>
          <div className="text-[10px] tracking-widest uppercase text-white/40">Premium Collection 2026</div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {books.map((book) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              key={book._id} 
              className="group cursor-pointer"
            >
              <div className="relative aspect-[2/3] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl transition-all duration-1000">
                {book.cover && (
                  <img 
                    src={urlFor(book.cover).url()} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
              </div>

              <div className="mt-8 space-y-2">
                <h3 className="text-2xl font-serif tracking-tight">{book.title}</h3>
                <p className="text-sm text-white/40 font-light leading-relaxed line-clamp-2">{book.description}</p>
                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                   <span className="text-lg font-medium tracking-tighter text-white">₦{book.price?.toLocaleString()}</span>
                   <a 
                     href={book.buyLink} 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center gap-2 text-[10px] uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition duration-500"
                   >
                     <ShoppingCart size={12} /> Secure Copy
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State message if no books exist yet */}
        {books.length === 0 && (
          <div className="text-center py-20 opacity-20">
            <p className="italic font-serif">The collection is currently private.</p>
          </div>
        )}
      </section>
    </main>
  );
}