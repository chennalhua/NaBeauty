import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { toCurrency } from '../assets/javascript/functionTool';
const HomePage = () => {
    let designerList = ['Annie', 'Eric']
    let serviceItem = [
        { itemName: '洗髮護理', fee: '' },
        { itemName: '剪髮設計', fee: '' },
        { itemName: '燙髮設計', fee: '' },
        { itemName: '染髮設計', fee: '' },
        { itemName: '護髮療程', fee: '' },
        { itemName: '頭皮療程', fee: '' },
        { itemName: '修指甲', fee: '' },
        { itemName: '上青捲', fee: '' }
    ]
    //* values
    let [personnelData, setPersonnelData] = useState({ owner: '', customer: '' }),
        [createServiceItem, setCreateServiceItem] = useState([{ id: 1, itemName: '', fee: '' }]),
        [total, setTotal] = useState(0),
        [thisStep, setThisStep] = useState('one') //one , two

    const handleEvent = {
        addItem: function (e) {
            e.preventDefault();
            setCreateServiceItem([...createServiceItem, { id: createServiceItem.length + 1, itemName: '', fee: '' }])
        },
        chooseServiceItem: function (id, e) { //選擇服務項目
            let { value } = e.target
            createServiceItem.map((item, index) => {
                if (id == item.id) {
                    item.itemName = value.split('-')[0];
                    item.fee = value.split('-')[1]
                }
            })
            setCreateServiceItem([...createServiceItem])
        },
        setFee: function (id, e) { //設定價錢
            console.log(id)
            let { value } = e.target
            createServiceItem.map((item, index) => {
                if (id == item.id) {
                    item.fee = value
                }
            })
            setCreateServiceItem([...createServiceItem])
            handleEvent.calTotal()
        },
        calTotal: function () { //計算總數
            let num = 0
            createServiceItem.map((item, index) => {
                num += Number(item.fee)
            })
            setTotal(num)
        }
    }

    useEffect(() => { }, [createServiceItem, total])
    return (
        <>
            <div className=''>
                <div className='container' style={{ width: '500px' }}>
                    <div className='row justify-content-center p-3'>
                        <img src={require('../assets/image/logo.png')} style={{ width: '200px' }} />
                        <p className='text-end mt-3'>{moment().format('YYYY/MM/DD HH:mm:ss')}</p>
                        {
                            thisStep == 'one' &&
                            <>
                                <div className='mb-3'>
                                    <div className='row g-0 align-items-center'>
                                        <div className='col-2'>
                                            <label for='designer' className='col-form-label'>設計師</label>
                                        </div>
                                        <div className='col-auto'>
                                            <select className="form-select" aria-label="Default select example"
                                                onChange={e => setPersonnelData({ ...personnelData, owner: e.target.value })}>
                                                <option selected disabled>請選擇設計師</option>
                                                {
                                                    designerList.map((item, index) => {
                                                        return (
                                                            <option value={item}>{item}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row g-0 align-items-center mt-2'>
                                        <div className='col-2'>
                                            <label for='customer' className='col-form-label'>顧客</label>
                                        </div>
                                        <div className='col-auto'>
                                            <input type="text" id="customer" className="form-control"
                                                onChange={e => setPersonnelData({ ...personnelData, customer: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                {
                                    createServiceItem.map((item, index) => {
                                        return (
                                            <div className='row g-2 align-items-center'>
                                                <div className='col-9'>
                                                    <select className="form-select" aria-label="Default select example" onChange={e => handleEvent.chooseServiceItem(item.id, e)}>
                                                        <option selected disabled>請選擇服務項目</option>
                                                        {
                                                            serviceItem.map((item, index) => {
                                                                return (
                                                                    <option value={`${item.itemName}-${item.fee}`}>{item.itemName}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className='col-3 text-end'>
                                                    <input type='text' className='form-control' onChange={e => handleEvent.setFee(item.id, e)} />
                                                    {/* <p className='m-0'>
                                                {toCurrency(item.fee)}
                                            </p> */}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <a href='#' className='text-center fs-5 text-primary py-3' onClick={handleEvent.addItem}><FontAwesomeIcon icon={faPlusCircle} /></a>
                                {/*  */}
                                <hr />
                                <div className='pb-3'>
                                    <div className='d-flex justify-content-between fw-bolder'>
                                        <p>小計</p>
                                        <p>{toCurrency(total)}</p>
                                    </div>
                                </div>
                                <div className='text-center mb-2'>
                                    <button className='btn btn-primary' onClick={e => setThisStep('two')}>送出</button>
                                </div>
                            </>
                        }
                        {
                            thisStep == 'two' &&
                            <>
                                <div className='pb-1'>
                                    <p className='m-0'>設計師：{personnelData.owner}</p>
                                    <p className='m-0'>顧客：{personnelData.customer}</p>
                                </div>
                                <hr />
                                <ul>
                                    {
                                        createServiceItem.map((item, index) => {
                                            return (
                                                <li className='d-flex justify-content-between'>
                                                    <p>◆ {item.itemName}</p>
                                                    <p>{toCurrency(item.fee)}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <p>小計</p>
                                    <p>{toCurrency(total)}</p>
                                </div>
                            </>
                        }
                        <p className='small text-center mt-2'>Copyright © 2022 NaBeauty Hair Salon. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage