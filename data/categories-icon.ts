import { AiOutlineWifi } from "react-icons/ai";
import { BiBed, BiBlanket } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import {
  CgFlag,
  CgSmartHomeLight,
  CgSmartHomeRefrigerator,
} from "react-icons/cg";
import {
  FaBandcamp,
  FaFireExtinguisher,
  FaMountain,
  FaPumpSoap,
  FaSink,
  FaSkiing,
  FaSkiingNordic,
  FaSoap,
  FaToiletPaper,
  FaUmbrellaBeach,
  FaVine,
} from "react-icons/fa";
import { FiSpeaker } from "react-icons/fi";
import {
  GiBathtub,
  GiFarmer,
  GiForkKnifeSpoon,
  GiPillow,
  GiRobe,
} from "react-icons/gi";
import { GrFan } from "react-icons/gr";
import {
  IoGameControllerOutline,
  IoGolfOutline,
  IoWaterOutline,
} from "react-icons/io5";
import {
  MdHomeMini,
  MdOutlineBalcony,
  MdOutlineCabin,
  MdOutlineFireplace,
  MdOutlineFreeBreakfast,
  MdOutlineIron,
  MdOutlineLocationCity,
  MdOutlineMicrowave,
  MdOutlinePool,
  MdOutlineSurfing,
  MdTrendingUp,
  MdTv,
  MdWorkspacesOutline,
} from "react-icons/md";
import {
  TbChefHat,
  TbFirstAidKit,
  TbHanger,
  TbNews,
  TbWashDryDip,
} from "react-icons/tb";

const categoriesIcon = {
  view_mountain: FaMountain,
  bathtub: GiBathtub,
  cleaning_supplies: FaPumpSoap,
  shampoo: FaPumpSoap,
  soap: FaSoap,
  toilet_bidet: FaPumpSoap,
  hot_water: IoWaterOutline,
  washer: TbWashDryDip,
  dryer: GrFan,
  toiletries: FaToiletPaper,
  hangers: TbHanger,
  blankets: BiBlanket,
  pillow: GiPillow,
  iron: MdOutlineIron,
  wardrobe: GiRobe,
  wi_fi: AiOutlineWifi,
  tv: MdTv,
  speakers: FiSpeaker,
  fireplace: MdOutlineFireplace,
  fan_ceiling: GrFan,
  fire_extinguisher: FaFireExtinguisher,
  first_aid_kit: TbFirstAidKit,
  workspace: MdWorkspacesOutline,
  refrigerator: CgSmartHomeRefrigerator,
  microwave: MdOutlineMicrowave,
  dishes_and_silverware: GiForkKnifeSpoon,
  dishwasher: FaSink,
  oven: MdOutlineMicrowave,
  door: BsDoorOpen,
  patio_balcony: MdOutlineBalcony,
  jacuzzi: GiBathtub,
  rooms: BiBed,
  "amazing-pools": MdOutlinePool,
  cabins: MdOutlineCabin,
  countryside: CgFlag,
  skiing: FaSkiing,
  lake: IoWaterOutline,
  beachfront: FaUmbrellaBeach,
  "iconic-cities": MdOutlineLocationCity,
  play: IoGameControllerOutline,
  "amazing-views": MdOutlineLocationCity,
  vineyards: FaVine,
  lakefront: FaUmbrellaBeach,
  trending: MdTrendingUp,
  new: TbNews,
  farms: GiFarmer,
  "tiny-homes": MdHomeMini,
  camping: FaBandcamp,
  "chefs-kitchens": TbChefHat,
  skiinout: FaSkiingNordic,
  surfing: MdOutlineSurfing,
  golfing: IoGolfOutline,
  "bed-breakfasts": MdOutlineFreeBreakfast,
};
export const getIcon = (type?: string) => {
  return (
    categoriesIcon[type?.toLowerCase() as keyof typeof categoriesIcon] ||
    CgSmartHomeLight
  );
};
export default categoriesIcon;
