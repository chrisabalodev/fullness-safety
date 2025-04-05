// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface PDFViewerProps {
  pdfUrl: string;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const bookRef = useRef<any>(null);

  const handlePageFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  // For demonstration, we'll use static images instead of PDF pages
  const pages = [
    "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb",
    "https://images.unsplash.com/photo-1586769852044-692d6e3703f0",
    "https://images.unsplash.com/photo-1581094794329-c8112c4e5190",
    "https://images.unsplash.com/photo-1574134935230-9f40a5a4d657"
  ];

  return (
    <div className="flex flex-col items-center h-full">
      <div className="relative flex-1 w-full max-w-4xl mx-auto">
        <HTMLFlipBook
          width={600}
          height={800}
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1000}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handlePageFlip}
          onInit={() => {
            setLoading(false);
            setTotalPages(pages.length);
          }}
          className="mx-auto"
          ref={bookRef}
        >
          {pages.map((page, index) => (
            <div key={index} className="relative bg-white shadow-lg">
              <img
                src={page}
                alt={`Page ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 text-sm text-white bg-black/50 px-2 py-1 rounded">
                Page {index + 1}
              </div>
            </div>
          ))}
        </HTMLFlipBook>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4 bg-card p-4 rounded-lg shadow-lg">
        <Button
          variant="outline"
          size="icon"
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          disabled={currentPage <= 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <span className="text-sm">
          Page {currentPage + 1} sur {totalPages}
        </span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}