import React,{useState, useEffect} from "react"
import { List, Skeleton, Pagination } from 'antd';
import { ArticleListApi } from '../request/api';
export default function ListList() {

    const[list, setList] = useState([])
    const[total, setTotal] = useState(0)
    const[current, setCurrent] = useState(1)
    const[pageSize, setPageSize] = useState(10)

    const getList = (num) => {
        ArticleListApi({
            num,
            count: pageSize
        }).then(res => {
            if (res.errCode === 0) {
                let { arr, total, num, count } = res.data
                setList(arr)
                setTotal(total)
                setCurrent(num)
                setPageSize(count)
            }
        })
    }
    useEffect(()=>{
        getList(current)
    },[])

    const onChange = (pages) => {
        getList(pages)
    }

    return (
        <div className="list_table" style={{padding: "20px"}}>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    >
                        <Skeleton title={false} loading={false} active>
                            <List.Item.Meta
                                title={<a href="!#">{item.title}</a>}
                                description={item.subTitle}
                            />
                            <div>{item.date}</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Pagination 
            onChange={onChange} 
            total={total}
            current={current}
            pageSize={pageSize}
            style={{float: 'right', marginTop: "10px"}} />
        </div>
    )
}