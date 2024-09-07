"use client";

import { Fragment, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CustomFilterProps } from '@/types';
import { updateSearchParams } from '@/utils';

const CustomFilter = ({ title, options} : CustomFilterProps) => {
  const router = useRouter(); 
  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = (e: {title :string, value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());
    

    router.push(newPathName, {scroll:false});
  }

  return (
    <div className = "w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}>
        <div className ="relative w-fit z-10">
          <ListboxButton className = "custom-filter__btn">
            <span className = "block truncate">{selected.title}</span>
            <Image 
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className = "ml-4 object-contain"
              alt="chevron up down"
            />
          </ListboxButton>
          
            <ListboxOptions anchor = "bottom" className = 'custom-filter_options mt-2 gap-2 bg-white'>
              {options.map((option) => (
                <ListboxOption
                  key={option.title}
                  value={option}
                  className = "relative cursor-default select-none py-2 px-4 bg-white data-[focus]:bg-primary-blue text-gray-900 data-[focus]:text-white">
                  <span className = "block truncate group-data-[selected]:font-medium group-data-[selected]:text-white  text-white-900">
                    {option.title}
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter