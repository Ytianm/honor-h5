import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import searchIcon from "../../imgs/search-line.png";
import classNames from "classnames";
import "./index.less";
import ListTable from "../../components/ListTable";
import {
  selectProjectInfo,
  selectWeekNewAdd,
  queryTimeStamp,
  selectStaffInfoOrg,
  selectStaffInfo
} from "../../http/api";

const ListPage = () => {
  const onBack = useCallback(() => {
    // window.history.back();
  }, []);

  // 搜索
  const Search = ({ onInput }) => {
    return (
      <div className="search">
        <img className="search-icon" src={searchIcon} alt="" />
        <input
          type="text"
          placeholder="请输入员工号或员工名"
          onInput={onInput}
        />
        <i className="icon-close" />
      </div>
    );
  };

  // 胶囊tab
  const SwitchTab = ({ onChangeTab, pageType, list }) => {
    const tabList = [
      {
        id: '1',
        label: "员工",
      },
      {
        id: '2',
        label: "机构",
      },
    ];
    return (
      <div className="switch">
        {tabList.map(({ label, id }) => {
          return (
            <span
              key={id}
              className={classNames({ checked: pageType === id })}
              onClick={() => onChangeTab(id)}
            >
              {label}
            </span>
          );
        })}
      </div>
    );
  };

  // 搜索事件
  const handleSearch = (evt) => {
    evt.preventDefault();
  };

  // 选项卡
  const ButtonTab = ({ list, direction, onClickItem, curAct }) => {
    // setCurAct(idProject);
    return (
      <div className="tab-wrap" style={{ flexDirection: direction }}>
        {list.map(({ idProject, projectName }) => (
          <div
            onClick={() => {
              onClickItem(idProject);
            }}
            className={classNames("tab-item", {
              active: curAct === idProject,
            })}
          >
            {projectName}
          </div>
        ))}
      </div>
    );
  };

  // 排行内容
  const RankItem = ({ name, number }) => {
    const [{ weekNewRanking }] = weekNewAddList || [];
    return (
      <div className="rank-item">
        <p className="name">{name}</p>
        <div className="rank-item-wrap">
          <Progress number={number} max={Number(weekNewRanking)} />
          <p className="number-text">{number}</p>
        </div>
      </div>
    );
  };

  // 单个进度条
  const Progress = ({ number, max = 1e4 }) => {
    const precent = (number / max) * 1e2;
    return (
      <div className="progress">
        <span className="percent" style={{ width: `${precent}%` }}></span>
      </div>
    );
  };

  // 复合进度条
  const MutiProgress = (props) => {
    const { percent } = props;
    const [one, two, three] = percent;
    return (
      <div className="muti-progress">
        <span className="muti-item" style={{ width: `${one}%` }}></span>
        <span className="muti-item" style={{ width: `${two}%` }}></span>
        <span className="muti-item" style={{ width: `${three}%` }}></span>
      </div>
    );
  };

  // 图例
  const Legend = (props) => {
    const { isMuti = true } = props;
    const legendList = [
      {
        id: 0,
        label: "周新增",
        backgroundColor: "#F6B44C",
      },
      {
        id: 1,
        label: "月新增",
        backgroundColor: "#F56543",
      },
      {
        id: 2,
        label: "月差距",
        backgroundColor: "#B6B7E8",
      },
    ];
    const ChooseLegend = isMuti ? (
      <div className="muti-legend">
        {legendList.map(({ id, label, backgroundColor }) => (
          <p className="legend-item" key={id}>
            <i className="legend-icon" style={{ backgroundColor }}></i> {label}
          </p>
        ))}
      </div>
    ) : (
      <p className="legend">周新增</p>
    );
    return ChooseLegend;
  };

  const dataList = [
    {
      rangeMostName: "李梦琪梦琪",
      numAll: 1,
      itemName: "金融资产",
      itemPath: require("../../imgs/detail-icon1.png"),
      addMostName: "李后裔",
    },
    {
      rangeMostName: "李梦琪",
      numAll: 5,
      itemName: "储蓄存款",
      itemPath: require("../../imgs/detail-icon2.png"),
      addMostName: "李后裔",
    },
    {
      rangeMostName: "李梦琪",
      numAll: 1200,
      itemName: "小微贷款",
      itemPath: require("../../imgs/detail-icon3.png"),
      addMostName: "李后裔",
    },
    {
      rangeMostName: "李梦琪",
      numAll: 0,
      itemName: "非按揭消贷",
      itemPath: require("../../imgs/detail-icon4.png"),
      addMostName: "李后裔",
    },
    {
      rangeMostName: "李梦琪",
      numAll: -3,
      itemName: "保险中收",
      itemPath: require("../../imgs/detail-icon5.png"),
      addMostName: "李后裔",
    },
    {
      rangeMostName: "李梦琪",
      numAll: 5,
      itemName: "基金销量",
      itemPath: require("../../imgs/detail-icon6.png"),
      addMostName: "李后裔",
    },
    {
      rangeMostName: "李梦琪",
      numAll: 6,
      itemName: "五星级管家卡发卡且达标",
      itemPath: require("../../imgs/detail-icon7.png"),
      addMostName: "李后裔",
    },
    {
      rangeMostName: "李梦琪",
      numAll: -12,
      itemName: "厅堂外行吸金",
      itemPath: require("../../imgs/detail-icon8.png"),
      addMostName: "李后裔",
    },
  ];

  // -----------  state

  const currentType = "1";
  const [projectList, setPojectList] = useState([]); // 产品信息数据
  const [weekNewAddList, setWeekNewAddList] = useState([]); // 周更新数据
  const [time, setTime] = useState(""); // 时间戳数据
  const [pageType, setPageType] = useState("1"); // 页面类型
  const [curAct, setCurAct] = useState(1); // 侧边tab数据
  const [tableList, setTableList] = useState([]); // 员工表格数据

  // -----------  handler function

  useEffect(() => {
    getTimeStamp(pageType);
    // 获取产品信息
    getProjectInfo(pageType);
  }, [pageType]);

  useEffect(() => {
    // 获取产品信息
    getStaffInfo();
  }, []);

  useEffect(() => {
    if (time) getWeekNewAdd(time, curAct);
  }, [time]);

  // 格式化时间戳字符串
  const formatTimeStr = (timeStr) => {
    if (timeStr) {
      const t = new Date(+timeStr);
      const n = t.getFullYear(),
        r = t.getMonth() + 1,
        o = t.getDate();
      return [n, r, o].map((e) => (e < 10 ? `0${e}` : e)).join("-");
    } else {
      return "";
    }
  };

  // 获取子组件id
  const onClickItem = useCallback(
    (id) => {
      getWeekNewAdd(time, id);
      setCurAct(id);
    },
    [time]
  );

  // 获取当前tab状态
  const onChangeTab = useCallback((cur) => {
    setPageType(cur);
  }, []);

  // -----------  async function

  // 查询员工数据
  const getStaffInfo = () => {
    const ajaxFn = currentType === '1' ? selectStaffInfo : selectStaffInfoOrg
    const params = {
        dateBelong: '1601308800000',
        idProject: '1',
        staffName: '',
        pageNo: 1,
        pageSize: 10,
        idOrganization: '',
        sortStr: ''
    }
    ajaxFn(params).then(res => {
        if (res && res.data) {
            let { data } = res.data
            console.log(data);
            setTableList(data)
        }
    })
  }  

  // 获取产品信息
  async function getProjectInfo() {
    try {
      const res = await selectProjectInfo();
      if (res.data && res.data.code === 200 && res.data.data) {
        let data = res.data.data;
        setPojectList(data);
      }
    } catch (e) {}
  }

  // 获取周更新数据
  async function getWeekNewAdd(time, idProject, pageNo = 1, pageSize = 7) {
    try {
      const res = await selectWeekNewAdd({
        dateBelong: time,
        idProject,
        pageNo,
        pageSize,
      });
      if (res.data && res.data.code === 200 && res.data.data) {
        let data = res.data.data;
        setWeekNewAddList(data);
      }
    } catch (e) {}
  }

  // 获取时间戳字符串
  async function getTimeStamp(pageType) {
    try {
      const res = await queryTimeStamp({ pageType });
      if (res.data && res.data.code === 200 && res.data.data) {
        let data = res.data.data;
        setTime(data);
      }
    } catch (e) {}
  }

  return (
    <>
      <Header title="民生银行" onBack={onBack} />
      <Banner timeStr={formatTimeStr(time)} />
      <div className="search-wrap">
        <Search onSearch={handleSearch} />
        <SwitchTab onChangeTab={onChangeTab} pageType={pageType} />
      </div>
      <div className="legend-wrap">
        <Legend />
      </div>
      <div className="rank-wrap">
        <ButtonTab
          direction="column"
          list={projectList}
          onClickItem={onClickItem}
          curAct={curAct}
        />
        <div className="rank-content">
          {weekNewAddList.map(({ staffName, weekNewRanking }) => (
            <RankItem
              key={staffName}
              name={staffName}
              number={weekNewRanking}
            />
          ))}
        </div>
      </div>
      <div>
        <ListTable
          list={tableList}
          dataType={currentType}
          tabType={currentType}
        />
      </div>
    </>
  );
};

export default ListPage;
