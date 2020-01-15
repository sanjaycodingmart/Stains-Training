import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render() {
        return (
            <div>
                <header className="welcomeheader">
                    <section className="whitecolor background_line">Get it together for 2020.<a>Switch to Basecamp.</a></section>
                    <section className="spacebetween">
                        <div><img src="https://launchpad-asset2.37signals.com/assets/brand-wrapper-backgrounds/paperclip-logo-349bf403c234be9d67457f2825054e138f6d54affe467717f3da909cab741cba.svg"></img>Basecamp</div>
                        <div className="welcomeMenu">
                            <a>How it works</a>
                            <a>Before & after</a>
                            <a>Got clients?</a>
                            <a>Pricing</a>
                            <a>Support</a>
                            <Link className="welcomeLink" to="/signin"><a className="abutton" type="primary">Sign in</a></Link>
                            <Link to="/register"><a className="abutton" type="primary">Try in FREE</a></Link>
                        </div>
                    </section>
                </header>
                <content className="textcenter colorprimary"><div className="widthcenter">
                    <h1 >Get it together and manage projects the right way.</h1>
                    <p><b>Before Basecamp:</b> Projects feel scattered, things slip, it’s tough to see where things stand, and people are stressed. <b>After Basecamp:</b> Everything’s organized in one place, you’re on top of things, progress is clear, and a sense of calm sets in.</p>
                    <div>
                        <button>Give Basecamp a Try</button>
                        <span>7,398 companies signed up in the last week alone!</span>
                    </div></div>
                </content>
            </div>
        )
    }
}

export default Welcome
