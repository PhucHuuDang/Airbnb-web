"use client";

import Container from "../Container";

import { IoDiamond } from "react-icons/io5";
import { BsSnow } from "react-icons/bs";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "../CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property is has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property in has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property in has camping activities!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property in a the cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property in a the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property in a in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property in a luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
