import React, { useState } from 'react'
function Footer () {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState)
    }


    return (
        <div>
            <p></p>
            <button className="button-small" onClick={toggleVisibility} 
                style={{fontSize:16, padding:'0px 4px', borderRadius:'24px'}}>❤</button>
            {isVisible &&
                <h3 style={{fontSize:12, textAlign:'left', width:'30%', margin:'0 auto'}}>
                    <br/>
                    Details for Nerds:<br/>
                    Backend:{"{"}python with Flask{"}"} <br/>
                    Frontend:{"{"}JavaScript with React, HTML, CSS{"}"} <br/>
                    Host:{"{"}{"}"} 
                    </h3>}
            {isVisible && <p style={{
                fontSize:12
            }}>
                <br/>
                Inspiration for this project was found through <a href="https://www.youtube.com/@DataProfessor">
                Chanin Nantasemat's</a> Bioinformatics Series.<br />
                Random Forest Model relies on PaDEL, a molecular fingerprinting functionality offered
                generously by Dr.Yap's lab:<br />
                <a href="https://onlinelibrary.wiley.com/doi/full/10.1002/jcc.21707">Yap CW (2011). PaDEL-Descriptor: An open source software to calculate molecular descriptors and
                fingerprints. Journal of Computational Chemistry. 32 (7): 1466-1474</a>
            </p>}
        </div>
    )
}

export default Footer;