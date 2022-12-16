const GraphTable = ({header, data, value, dataMapper}) => {
    return (
        <table className="vpd__table">
            <thead>
                <tr className="vpd__header">
                    <th>---</th>
                    {header && header.map((value) => {
                        return <th>{value}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data && dataMapper(data, value)}
                
            </tbody>
        </table>
    )
}

export default GraphTable