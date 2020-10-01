import React, { Component, Fragment } from "react";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import searchIcon from "../../imgs/search-line.png";
import classNames from "classnames";
import styles from "./index.less";
import ListTable from "../../components/ListTable";
import {
  selectProjectInfo,
  selectWeekNewAdd,
  queryTimeStamp,
  selectStaffInfoOrg,
  selectStaffInfo,
} from "../../http/api";

// 搜索
class Search extends Component {
  render() {
    const { onInput } = this.props;
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
  }
}

// 胶囊tab
class SwitchTab extends Component {
  // 搜索事件
  handleSearch = (evt) => {
    evt.preventDefault();
  };

  render() {
    const tabList = [
      {
        id: "1",
        label: "员工",
      },
      {
        id: "2",
        label: "机构",
      },
    ];
    const { onChangeTab, pageType } = this.props;
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
  }
}

// 选项卡
class ButtonTab extends Component {
  render() {
    const { list = [], direction, onClickItem, curAct } = this.props;
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
  }
}

// 排行内容
class RankItem extends Component {
  render() {
    const { name, number, weekNewAddList } = this.props;
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
  }
}

// 单个进度条
class Progress extends Component {
  render() {
    const { number, max = 1e4 } = this.props;
    const precent = (number / max) * 1e2;
    return (
      <div className="progress">
        <span className="percent" style={{ width: `${precent}%` }}></span>
      </div>
    );
  }
}

// 复合进度条
class MutiProgress extends Component {
  render() {
    const { percent } = this.props;
    const [one, two, three] = percent;
    return (
      <div className="muti-progress">
        <span className="muti-item" style={{ width: `${one}%` }}></span>
        <span className="muti-item" style={{ width: `${two}%` }}></span>
        <span className="muti-item" style={{ width: `${three}%` }}></span>
      </div>
    );
  }
}

// 图例
class Legend extends Component {
  render() {
    const { isMuti = true } = this.props;
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
  }
}

export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [], // 产品信息数据
      weekNewAddList: [], // 周更新数据
      time: [], // 时间戳数据
      pageType: [], // 页面类型
      curAct: [], // 侧边tab数据
      tableList: [], // 员工表格数据
      currentType: "1",
      dataList: [
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
      ],
    };
  }

  componentWillMount() {
    const { time } = this.props;
    const { pageType, curAct } = this.state;
    this.getTimeStamp(pageType); // 获取产品信息
    this.getProjectInfo(pageType);
    this.getStaffInfo(); // 获取产品信息
    if (time) this.getWeekNewAdd(time, curAct);
  }

  // 格式化时间戳
  formatTimeStr = (timeStr) => {
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

  // 获取当前tab状态
  onChangeTab = (curAct) => {
    this.setState({ curAct });
  };

  // 查询员工数据
  getStaffInfo = () => {
    const { currentType } = this.state;
    const ajaxFn = currentType === "1" ? selectStaffInfo : selectStaffInfoOrg;
    const params = {
      dateBelong: "1601308800000",
      idProject: "1",
      staffName: "",
      pageNo: 1,
      pageSize: 10,
      idOrganization: "",
      sortStr: "",
    };
    ajaxFn(params).then((res) => {
      if (res && res.data) {
        let { data } = res.data;
        console.log(data);
        this.setState({ tableList: data });
      }
    });
  };

  // 获取周更新数据
  getWeekNewAdd = async (time, idProject, pageNo = 1, pageSize = 7) => {
    try {
      const res = await selectWeekNewAdd({
        dateBelong: time,
        idProject,
        pageNo,
        pageSize,
      });
      if (res.data && res.data.code === 200 && res.data.data) {
        let data = res.data.data;
        this.setState({ weekNewAddList: data });
      }
    } catch (e) {}
  };

  // 获取时间戳字符串
  getTimeStamp = async (pageType) => {
    try {
      const res = await queryTimeStamp({ pageType });
      if (res.data && res.data.code === 200 && res.data.data) {
        let time = res.data.data;
        this.setState({ time });
      }
    } catch (e) {}
  };

  // 获取产品信息
  getProjectInfo = async () => {
    try {
      const res = await selectProjectInfo();
      if (res.data && res.data.code === 200 && res.data.data) {
        let pojectList = res.data.data;
        this.setState({ pojectList });
      }
    } catch (e) {}
  };

  render() {
    const {
      weekNewAddList,
      time,
      pageType,
      curAct,
      tableList,
      currentType,
      productList
    } = this.state;
    const { onChangeTab, onClickItem } = this.props;
    return (
      <Fragment>
        <Header title="民生银行" />
        <Banner timeStr={this.formatTimeStr(time)} />
        <div className="search-wrap">
          <Search onSearch={() => this.handleSearch} />
          <SwitchTab onChangeTab={onChangeTab} pageType={pageType} />
        </div>
        <div className="legend-wrap">
          <Legend />
        </div>
        <div className="rank-wrap">
          <ButtonTab
            direction="column"
            onClickItem={onClickItem}
            curAct={curAct}
            list={productList}
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
      </Fragment>
    );
  }
}
