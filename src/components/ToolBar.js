import React from 'react'

export default function ToolBar({util}) {


    function setActive(e, s) {
        util(s)
        const elements = document.getElementsByClassName("sorting-btn")
        for (let elem of elements) {
            elem.id === e ? elem.classList.add("active") : elem.classList.remove('active')
        }
    }

    return (
        <>
                <div className="row w-100 my--30 align-content-center">
                    <div style={{display: "flex", alignItems: "center"}} className="col-lg-6 col-md-2 col-sm-6">
                        <div className="product-view-mode">
                            <a id="first" onClick={(event) => setActive(event.target.id, 'normal')}
                               className="sorting-btn active"><i
                                className="fas fa-th" id="first"/></a>
                            <a id={"second"} onClick={(event) => setActive(event.target.id, 'small')}
                               className="sorting-btn">
									<span className="grid-four-icon">
										<i className="fas fa-grip-vertical" id={"second"}/><i
                                        className="fas fa-grip-vertical" id={"second"}/>
									</span>
                            </a>
                            <a id={"third"} onClick={(event) => setActive(event.target.id, 'list')}
                               className="sorting-btn"><i
                                className="fas fa-list" id={"third"}/></a>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-4 col-sm-6 mt--10 mt-md--0 ">
                        <div className="sorting-selection">
                            <span>Sort By:</span>
                            <select className="form-control nice-select sort-select mr-0">
                                <option value="" selected="selected">Default Sorting</option>
                                <option value="">Sort
                                    By:Name (A - Z)
                                </option>
                                <option value="">Sort
                                    By:Name (Z - A)
                                </option>
                                <option value="">Sort
                                    By:Price (Low &gt; High)
                                </option>
                                <option value="">Sort
                                    By:Price (High &gt; Low)
                                </option>
                                <option value="">Sort
                                    By:Rating (Highest)
                                </option>
                                <option value="">Sort
                                    By:Rating (Lowest)
                                </option>
                                <option value="">Sort
                                    By:Model (A - Z)
                                </option>
                                <option value="">Sort
                                    By:Model (Z - A)
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
        </>
    )
}