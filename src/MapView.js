import React from 'react';
import {makeStyles} from '@material-ui/core';
import somaliaMap from './Somalia_regions_map.svg';
import { motion } from "framer-motion";

const useStyles = makeStyles(theme => ({
  mapBox: {
    width: 400,
    display: "block",
    margin: "auto",
  },
  mapView: {
    backgroundColor: "white",
    width: "100%",
  },
}));

function MapView() {
  const classes = useStyles();

  return (
    <div className={classes.mapView}>
      <div className={classes.mapBox}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1051.004 1338">
        <path
          d="M 734.92625,981.89347 C 726.8607,970.9814 718.25131,959.07156 715.79429,955.42701 L 711.32694,948.80055 L 711.35498,829.39018 L 711.38302,709.97983 L 721.52522,699.83714 C 729.99693,691.36506 760.27807,649.13876 771.57524,630.04368 C 776.26071,622.12405 781.66074,619.36001 793.9925,618.56924 C 800.04143,618.18136 811.04738,616.66604 818.45016,615.20185 L 831.90976,612.5397 L 838.32884,602.25975 C 847.02084,588.33977 850.69575,585.94065 883.20189,572.96491 L 896.23711,567.76151 L 931.26922,568.18758 L 966.30142,568.61364 L 985.99862,547.57761 C 996.83202,536.00782 1031.3334,498.73147 1062.6685,464.74129 C 1094.0035,430.75112 1127.8504,394.42416 1137.884,384.01472 C 1154.8615,366.40121 1160.4075,357.72226 1153.2753,359.92882 C 1147.4883,361.71922 1098.6792,362.68244 1093.6348,361.10579 C 1059.6355,350.47945 972.34462,322.30076 970.43292,321.33463 C 969.05682,320.63913 953.75092,315.75703 936.42002,310.48551 L 904.90915,300.90094 L 892.00695,288.88463 C 884.91073,282.27566 877.70316,276.86831 875.99014,276.86831 C 874.2771,276.86831 870.43296,274.1707 867.44759,270.87363 C 864.46223,267.57655 860.7365,263.7037 859.1682,262.26733 C 857.5999,260.83095 856.31675,257.56923 856.31675,255.01907 C 856.31675,252.26455 854.82855,249.07378 852.65059,247.15859 C 836.26941,232.75394 826.23841,220.79504 820.72552,209.09773 C 817.89641,203.09486 815.58168,197.71093 815.58168,197.13342 C 815.58168,195.1271 851.94631,141.73161 853.31271,141.73161 C 854.06876,141.73161 854.68734,142.90843 854.68734,144.34677 C 854.68734,145.78512 856.88704,147.80172 859.57555,148.8281 C 862.34935,149.88704 864.46376,151.89834 864.46376,153.4779 C 864.46376,155.00893 868.31322,162.04925 873.01812,169.12308 C 879.24523,178.48555 885.78371,185.46504 897.05181,194.77778 C 919.15822,213.04803 919.73822,213.27506 940.68212,211.85609 C 956.39252,210.79168 959.09532,210.11627 968.15912,204.98965 C 973.68802,201.86238 979.10452,198.21565 980.19572,196.8858 C 981.28692,195.55595 983.77352,194.46789 985.72132,194.46789 C 987.66922,194.46789 994.55042,191.17073 1001.0128,187.14087 C 1012.5305,179.95864 1012.8741,179.86094 1018.4016,182.19685 C 1021.503,183.50749 1027.6708,184.57984 1032.1078,184.57984 C 1036.7456,184.57984 1042.2426,185.77994 1045.0385,187.40286 C 1049.6331,190.06993 1050.396,190.0683 1058.8491,187.37326 C 1066.9284,184.79739 1081.9617,175.2398 1095.0242,164.37459 C 1101.9824,158.58688 1112.9147,153.26767 1117.8519,153.26767 C 1120.1725,153.26767 1124.0512,154.26886 1126.4712,155.49252 C 1129.876,157.21419 1134.3229,157.39731 1146.1338,156.30224 C 1159.1638,155.09413 1162.2623,154.2107 1167.316,150.26287 C 1177.5067,142.30213 1189.2012,140.1127 1202.4248,143.68989 C 1209.9277,145.71951 1211.8823,145.44753 1234.3381,139.24929 C 1239.267,137.88881 1245.4995,135.12588 1248.188,133.10944 C 1251.154,130.88496 1256.921,128.93876 1262.8526,128.16052 C 1268.2297,127.45508 1274.9749,126.54622 1277.842,126.14084 C 1290.2374,124.38832 1305.3352,113.98455 1309.3995,104.39487 C 1311.0846,100.41864 1313.7659,96.756179 1315.3579,96.256069 C 1316.9498,95.755949 1319.4545,94.704199 1320.9237,93.918839 C 1322.6718,92.984489 1327.4589,93.834239 1334.7737,96.377279 C 1340.9219,98.514759 1347.9686,100.7088 1350.433,101.25291 C 1354.1521,102.07402 1354.9139,103.11433 1354.9139,107.37231 C 1354.9139,110.19387 1353.562,114.81477 1351.9094,117.64098 C 1350.2571,120.46718 1347.9379,127.05291 1346.7561,132.27597 C 1344.7437,141.17009 1344.8168,142.0063 1347.9106,145.46003 C 1350.5546,148.4117 1350.9336,150.13436 1349.8096,154.09168 C 1348.9571,157.0926 1349.1398,163.95627 1350.274,171.55555 C 1351.8902,182.38416 1351.783,184.80438 1349.481,189.47182 C 1348.017,192.43984 1347.198,195.48817 1347.6611,196.24589 C 1348.124,197.00359 1346.368,198.7401 1343.7588,200.10478 C 1337.9031,203.16749 1336.9989,205.44858 1336.9585,217.26279 C 1336.9408,222.40048 1335.9041,232.4713 1334.6547,239.6424 C 1333.171,248.15933 1332.8995,254.05457 1333.8724,256.64239 C 1335.4908,260.94756 1334.2483,264.26066 1327.7747,272.90384 C 1325.6741,275.70862 1323.9552,279.75616 1323.9552,281.89841 C 1323.9552,284.12309 1321.5193,288.31664 1318.2747,291.67737 C 1314.0237,296.08038 1311.563,301.07535 1308.4978,311.52295 C 1306.2449,319.20184 1302.9941,326.66769 1301.274,328.11373 C 1299.5536,329.55978 1297.3028,333.91094 1296.2719,337.78296 C 1294.8751,343.02943 1291.7209,347.41293 1283.8917,354.98881 C 1274.2241,364.34339 1273.4685,365.57358 1274.4238,370.40481 C 1275.2508,374.58668 1274.0823,378.38533 1268.6817,389.07307 C 1264.9526,396.453 1259.2394,406.67117 1255.986,411.78009 C 1239.7974,437.20089 1233.4563,452.05252 1232.027,467.89574 C 1231.498,473.76 1229.2685,482.45348 1227.0196,487.42183 C 1222.1687,498.13857 1205.9018,523.51402 1190.514,544.36843 C 1184.3725,552.69177 1176.975,564.3222 1174.0751,570.21384 C 1171.1753,576.10547 1167.0504,583.28663 1164.9089,586.17196 C 1162.7672,589.0573 1161.015,591.93524 1161.015,592.56737 C 1161.015,593.1995 1156.1844,599.29649 1150.2803,606.11623 C 1144.3762,612.93597 1137.6161,621.55289 1135.2579,625.26496 C 1132.8996,628.97702 1123.8488,639.57352 1115.1448,648.81277 C 1106.4411,658.05201 1096.2681,669.54686 1092.5384,674.3569 C 1075.7081,696.06213 1017.2574,748.19876 1009.7537,748.19876 C 1008.9268,748.19876 1007.2439,749.42671 1006.0139,750.92755 C 1004.784,752.42837 997.91182,756.50375 990.74242,759.98391 C 967.58312,771.22599 936.48402,792.88549 915.75122,812.21279 C 902.08781,824.94995 875.82772,848.40097 873.36931,850.06109 C 872.44223,850.68709 870.00428,853.42411 867.95163,856.14332 C 861.39155,864.83368 846.31311,881.31086 824.49078,903.63578 C 812.81161,915.58393 799.29769,930.73631 794.45983,937.30775 C 789.16367,944.50173 784.48419,949.25581 782.69927,949.25581 C 780.84992,949.25581 779.73482,950.46047 779.73482,952.45838 C 779.73482,954.21979 778.37355,956.63001 776.70977,957.81441 C 775.04599,958.9988 773.11671,961.82187 772.42248,964.0879 C 771.72826,966.35389 769.79001,970.17641 768.11522,972.58237 C 766.44046,974.98827 765.0702,977.69487 765.0702,978.59697 C 765.0702,981.01757 752.85391,1000.9137 751.09649,1001.3552 C 750.26841,1001.5632 742.99179,992.80537 734.92625,981.89347 z M 1357.4564,195.15592 C 1355.9429,193.62508 1355.3191,191.75091 1356.0703,190.99111 C 1358.1052,188.93288 1367.1344,191.86695 1367.1344,194.58646 C 1367.1344,198.01779 1360.6624,198.39861 1357.4564,195.15592 z "
          strokeWidth={20}/>
        </svg>
      </div>
    </div>
  );
}

export default MapView;
