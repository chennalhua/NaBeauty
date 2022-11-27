import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toCurrency } from "../assets/javascript/functionTool";
import Loading from "./Loading";
const HomePage = () => {
  let designerList = ["Annie", "Eric"];
  let assistantList = ["貞燕", "毓君"];
  let serviceItem = [
    { itemName: "洗髮護理", fee: "", isHaveFee: "false" },
    { itemName: "洗髮", fee: "200", isHaveFee: "true" },
    { itemName: "洗髮卡", fee: "180", isHaveFee: "true" },
    { itemName: "剪髮設計", fee: "", isHaveFee: "false" },
    { itemName: "燙髮設計", fee: "", isHaveFee: "false" },
    { itemName: "染髮設計", fee: "", isHaveFee: "false" },
    { itemName: "護髮療程", fee: "", isHaveFee: "false" },
    { itemName: "護髮(一般)", fee: "550", isHaveFee: "true" },
    { itemName: "護髮(物化機)", fee: "800", isHaveFee: "true" },
    { itemName: "頭皮療程", fee: "", isHaveFee: "false" },
    { itemName: "頭皮精油", fee: "799", isHaveFee: "true" },
    { itemName: "頭皮SPA", fee: "699", isHaveFee: "true" },
    { itemName: "修指甲", fee: "", isHaveFee: "false" },
    { itemName: "上青捲", fee: "", isHaveFee: "false" },
  ];
  //* values
  let [personnelData, setPersonnelData] = useState({
      owner: "",
      assistant: "",
      customer: "",
    }),
    [createServiceItem, setCreateServiceItem] = useState([
      { id: 1, itemName: "", fee: "" },
    ]),
    [total, setTotal] = useState(0),
    [thisStep, setThisStep] = useState("one"), //one , two
    [isHavePro, setIsHavePro] = useState(false), //是否有購買產品
    [isLoading, setIsLoading] = useState(false);

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const handleEvent = {
    addItem: function (e) {
      e.preventDefault();
      setCreateServiceItem([
        ...createServiceItem,
        { id: getRandom(1, 100), itemName: "", fee: "" },
      ]);
    },
    delItem: function (e, id) {
      e.preventDefault();
      let newAry = [];
      createServiceItem.map((item, index) => {
        if (id !== item.id) {
          newAry.push(item);
        }
      });
      setCreateServiceItem(newAry);
    },
    chooseServiceItem: function (id, e) {
      //選擇服務項目
      let { value } = e.target;
      createServiceItem.map((item, index) => {
        if (id == item.id) {
          item.itemName = value.split("-")[0];
          item.fee = value.split("-")[1];
          item.isHaveFee = value.split("-")[2];
        }
      });
      setCreateServiceItem([...createServiceItem]);
    },
    setFee: function (id, e) {
      //設定價錢
      let { value } = e.target;
      createServiceItem.map((item, index) => {
        if (id == item.id) {
          item.fee = value;
        }
      });
      setCreateServiceItem([...createServiceItem]);
    },
    calTotal: function () {
      //計算總數
      let num = 0;
      createServiceItem.map((item, index) => {
        num += Number(item.fee);
      });
      setTotal(num);
    },
    printEvent: function () {
      var text = document.getElementById("printPage");
      window.print(text);
    },
    sendEvent: function () {
      setThisStep("two");
      setTimeout(() => {
        handleEvent.printEvent();
      }, 1000);
    },
  };

  useEffect(() => {
  }, [isHavePro, isLoading]);
  useEffect(() => {
    handleEvent.calTotal();
  }, [createServiceItem, total]);
  return (
    <>
      <Loading isLoading={isLoading} />
      <div id="printPage">
        <div
          className="container"
          style={
            thisStep == "one"
              ? { width: "500px" }
              : { width: "300px", fontSize: "24px" }
          }
        >
          <div className="row justify-content-center p-3">
            {/* <img src={require('../assets/image/logo.png')} style={{ width: '200px' }} /> */}
            <h1 className="text-center">Na Mi 沙龍</h1>
            <p className="text-end mt-3" style={{ fontSize: "18px" }}>
              {moment().format("YYYY/MM/DD HH:mm:ss")}
            </p>
            {thisStep == "one" && (
              <>
                <div className="mb-3">
                  <div className="row g-0 align-items-center">
                    <div className="col-2">
                      <label for="designer" className="col-form-label">
                        設計師
                      </label>
                    </div>
                    <div className="col-auto">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          setPersonnelData({
                            ...personnelData,
                            owner: e.target.value,
                          })
                        }
                      >
                        <option selected disabled>
                          請選擇設計師
                        </option>
                        {designerList.map((item, index) => {
                          return <option value={item}>{item}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row g-0 align-items-center mt-2">
                    <div className="col-2">
                      <label for="designer" className="col-form-label">
                        助理
                      </label>
                    </div>
                    <div className="col-auto">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          setPersonnelData({
                            ...personnelData,
                            assistant: e.target.value,
                          })
                        }
                      >
                        <option selected disabled>
                          請選擇助理
                        </option>
                        {assistantList.map((item, index) => {
                          return <option value={item}>{item}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="row g-0 align-items-center mt-2">
                    <div className="col-2">
                      <label for="customer" className="col-form-label">
                        顧客
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        id="customer"
                        className="form-control"
                        onChange={(e) =>
                          setPersonnelData({
                            ...personnelData,
                            customer: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <hr />
                {createServiceItem.map((item, index) => {
                  return (
                    <div className="row g-2 align-items-center">
                      <div className="col-9">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) =>
                            handleEvent.chooseServiceItem(item.id, e)
                          }
                        >
                          <option selected disabled>
                            請選擇服務項目
                          </option>
                          {serviceItem.map((item, index) => {
                            return (
                              <option
                                value={`${item.itemName}-${item.fee}-${item.isHaveFee}`}
                              >
                                {item.itemName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-3 text-end">
                        <div className="d-flex align-items-center">
                          {item.isHaveFee == "false" ? (
                            <input
                              type="text"
                              className="form-control text-end fw-bolder"
                              onChange={(e) => handleEvent.setFee(item.id, e)}
                            />
                          ) : (
                            <p className="m-0">{toCurrency(item.fee)}</p>
                          )}
                          <a
                            href="#"
                            onClick={(e) => handleEvent.delItem(e, item.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{fontSize:'18px'}}
                              className="mx-2 text-danger"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <a
                  href="#"
                  className="text-center fs-5 text-primary py-3"
                  onClick={handleEvent.addItem}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </a>
                {/*  */}
                <hr />
                <div>
                  <div className="d-flex">
                    <p className="me-2">是否有購買產品</p>
                    <div class="form-check mx-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onClick={(e) => setIsHavePro(true)}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        是
                      </label>
                    </div>
                    <div class="form-check mx-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked
                        onClick={(e) => setIsHavePro(false)}
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        否
                      </label>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="pb-3">
                  <div className="d-flex justify-content-between fw-bolder">
                    <p>小計</p>
                    <p>{toCurrency(total)}</p>
                  </div>
                </div>
                <div className="text-center mb-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleEvent.sendEvent}
                  >
                    送出
                  </button>
                </div>
              </>
            )}
            {thisStep == "two" && (
              <>
                <div className="pb-1">
                  <p className="m-0">設計師：{personnelData.owner}</p>
                  <p className="m-0">助理：{personnelData.assistant}</p>
                  <p className="m-0">顧客：{personnelData.customer}</p>
                </div>
                <ul className="mt-2 border-2 border-top pt-2">
                  {createServiceItem.map((item, index) => {
                    return (
                      <li className="d-flex justify-content-between">
                        <p>◆ {item.itemName}</p>
                        <p>{toCurrency(item.fee)}</p>
                      </li>
                    );
                  })}
                </ul>
                {isHavePro && <div style={{ height: "200px" }}></div>}
                {/* <hr /> */}
                <div className="d-flex justify-content-between border-2 border-top pt-2">
                  <p>小計</p>
                  <p>{toCurrency(total)}</p>
                </div>
              </>
            )}
            <p className="small text-center mt-2" style={{ fontSize: "14px" }}>
              Copyright © 2022 NaMi Hair Salon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {thisStep == "two" && (
        <div className="text-center">
          <button
            className="btn btn-primary mx-1"
            onClick={(e) => window.location.reload()}
          >
            返回
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={(e) => handleEvent.printEvent()}
          >
            列印
          </button>
        </div>
      )}
    </>
  );
};
export default HomePage;
