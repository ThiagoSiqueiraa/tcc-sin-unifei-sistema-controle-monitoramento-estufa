function SideActionButton({click, classes, icon}) {
    return (<div class="fixed-action-buttons">
        <div
            onClick={click}
            className={classes}
        >
            <i className={icon}></i>
        </div>

        <div class="clearfix"></div>
    </div>
    )
}

export default SideActionButton