import React from 'react';
import { Search, MousePointerClick, FlaskConical, Camera, Lightbulb } from 'lucide-react';

export const Instructions: React.FC = () => (
  <section
    aria-labelledby="instructions-title"
    className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 md:p-4 backdrop-blur-md shadow-md"
  >
    <h2 id="instructions-title" className="text-sm font-bold text-slate-100 mb-2 flex items-center gap-2">
      <Lightbulb className="w-4 h-4 text-amber-400" aria-hidden="true" />
      როგორ გამოვიყენოთ საიტი
    </h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs text-slate-300">
      <li className="flex gap-2 items-start bg-slate-950/40 p-2 rounded-lg border border-slate-850">
        <Search className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong className="text-slate-100 block mb-0.5">ძიება და ფილტრი:</strong>
          ჩაწერეთ სახელი, სიმბოლო ან ატომური ნომერი. პერიოდები მითითებულია რომაულად (I–VII).
        </span>
      </li>
      <li className="flex gap-2 items-start bg-slate-950/40 p-2 rounded-lg border border-slate-850">
        <Camera className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong className="text-slate-100 block mb-0.5">ფოტო და თვისებები:</strong>
          დააჭირეთ ელემენტს მისი ნამდვილი ფოტოსურათის, ბორის ატომური მოდელისა და თვისებების სანახავად.
        </span>
      </li>
      <li className="flex gap-2 items-start bg-slate-950/40 p-2 rounded-lg border border-slate-850">
        <FlaskConical className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong className="text-slate-100 block mb-0.5">ნაერთების შერევა:</strong>
          ჩართეთ რეჟიმი „ელემენტების შერევა“ და აირჩიეთ 2, 3 ან მეტი ელემენტი ნაერთის, ნალექისა თუ აირის გამოსაკვლევად.
        </span>
      </li>
      <li className="flex gap-2 items-start bg-slate-950/40 p-2 rounded-lg border border-slate-850">
        <MousePointerClick className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          <strong className="text-slate-100 block mb-0.5">რეაქციის ანალიზი:</strong>
          თუ ელემენტები არ რეაგირებენ ან ოქსიდი მარილარწარმომქმნელია, სისტემა მკაფიოდ გიჩვენებთ მიზეზსა და რეკომენდაციას.
        </span>
      </li>
    </ul>
  </section>
);
