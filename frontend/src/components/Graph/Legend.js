const Legend = () => {

    return (
        <div className='my-legend'>
            <div className='legend-scale'>
                <ul className='legend-labels'>
                    <li><span style={{ backgroundColor: '#b5d9a4' }}></span>Ideal</li>
                    <li><span style={{ backgroundColor: '#ee9897' }}></span>Fora da zona ideal</li>

                </ul>
            </div>
        </div>)
}

export default Legend