const pieOpt = {
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 30,
  },
  color: [
    "#f47b38",
    "#27d8d8",
    "#387ff2",
    "#2add87",
    "#f4ba37",
    "#38b4f2",
    "#dd6b66",
    "#759aa0",
    "#e69d87",
    "#8dc1a9",
    "#ea7e53",
    "#eedd78",
    "#73a373",
    "#73b9bc",
    "#7289ab",
    "#91ca8c",
    "#f49f42",
    "#c23531",
    "#2f4554",
    "#61a0a8",
    "#d48265",
    "#91c7ae",
    "#749f83",
    "#ca8622",
    "#bda29a",
    "#6e7074",
    "#546570",
    "#c4ccd3",
  ],
  series: [
    {
      type: "pie",
      data: [{ name: "", value: 0 }],
      radius: "70%",
      insideLabel: {
        show: true,
      },
      outsideLabel: {
        show: true,
        labelLineEndLength: 0,
        labelLineBendGap: 0,
        style: {
          fontSize: 14,
        },
      },
      roseType: true,
    },
  ],
};

export default pieOpt;