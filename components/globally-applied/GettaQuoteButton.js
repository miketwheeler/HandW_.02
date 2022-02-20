import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DocStyles from '../../styles/contentStyles.module.css';



function GettaQuoteButton() {

    const history = useHistory();

    function goToQuotesForm(e) {
		e.preventDefault();
		history.push("/quotes-estimates");
		window.scrollTo(0, 480);
	}

    return (
        <>
            <div className={DocStyles.quotebutton}>
                <Button
                    variant="contained"
                    style={{backgroundColor: 'rgb(182, 98, 50)', color: 'white', width: 230, height: 60}}
                    size="large"
                    onClick={(e) => goToQuotesForm(e)}
                    >
                        Get a Quote Today
                </Button>
            </div>
        </>
    )
}

export default GettaQuoteButton