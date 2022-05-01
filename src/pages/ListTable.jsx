import React,{useEffect, useState} from 'react'
import './less/listtable.less'
import { Table, Button, Space } from 'antd';
import { ArticleListApi } from '../request/api';
import monment from 'moment'

function MyTitle(props) {
    return (
        <div>
            <a href={
                "http://codesohigh.com:8765/article/2035"+props.id
            } className='list_title' target="_blank" >{props.title}</a>
            <p style={{color: '#999'}}>{props.subtitle}</p>
        </div>
    )
}

export default function List() {

    const [arr, setarr] = useState([
        {
            key: '1',
            name: 'John Brown',
            address: 'New York No. 1 Lake Park',
        }
    ])
    // 分页
    const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 10})
    const getArticleList = (current, pageSize) => {
        ArticleListApi({
            num: current,
            count: pageSize
        }).then(res => {
            // console.log(res)
            if (res.errCode === 0) {
                let {num, total, count} = res.data
                setPagination({
                    current: num,
                    pageSize: count,
                    total
                })
                let newArr = JSON.parse(JSON.stringify(res.data.arr));

                let myarr = []
                /*
                key = id
                标签结构赋予属性
                */
                newArr.map(item => {
                    let obj = {
                        key: item.id,
                        date: monment(item.date).format("YY-MM-DD hh:mm:ss"),
                        mytitle: <MyTitle title={item.title} subtitle={item.subTitle} id={item.id} />
                    }
                    myarr.push(obj)
                })
                // console.log(myarr)
                setarr(myarr)
            }
        })
    }
    useEffect(()=>{
        getArticleList(pagination.current, pagination.pageSize);
    },[])
    const columns = [
        {
            dataIndex: 'mytitle',
            key: 'mytitle',
            width: '60%',
            render: text => {
                return(
                    <div>{text}</div>
                )
            }

        },
        {
            dataIndex: 'date',
            key: 'date',
            render: text => <p>{text}</p>
        },
        {
            key: 'action',
            render: text => {
                return(
                    <Space size = "middle" >
                    <Button type='primary' onClick={()=>console.log(text.key)}>编辑</Button>
                    <Button type='danger' onClick={() => console.log(text.key)}>删除</Button>
                    </Space >
                )
            },
        },
    ];

    //分页
    const pageChange = (arg) => {
        console.log(arg)
        getArticleList(arg.current, arg.pageSize);
    }

    return (
        <div className='list_table'>
            <Table 
            showHeader={false} 
            columns={columns} 
            dataSource={arr} 
            onChange={pageChange} 
            pagination={pagination}
            />
        </div>
    )
}