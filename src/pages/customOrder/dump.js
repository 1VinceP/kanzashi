<form className='form-content' id='orderForm'>
                            {/* <p>Product Type: </p>
                            <select name='orderType' id='orderType' onChange={ e => this.handleInputChange(e) }>
                                <option value=''>--Select a style--</option>
                                <option value='headband'>Headband</option>
                                <option value='flower'>Flower</option>
                                <option value='centerpiece'>Centerpiece</option>
                            </select>
                            <br/> */}
                            {/* <p>Material: </p>
                            <select name='orderMaterial' onChange={ e => this.handleInputChange(e) }>
                                <option value='ribbon'>Ribbon</option>
                            </select>
                            <br/> */}
                            {/* <p>Base Color: </p>
                            <select name='orderBaseColor' onChange={ e => this.handleInputChange(e) }>
                                <option value=''>--Select a color--</option>
                                <option value='black'>Black</option>
                                <option value='brown'>Brown</option>
                                <option value='cream'>Cream</option>
                                <option value='navy-blue'>Navy Blue</option>
                                <option value='orange'>Orange</option>
                                <option value='white'>White</option>
                            </select>
                            <br/> */}
                            {/* <p>Secondary Color: </p>
                            <select name='orderSecondaryColor' onChange={ e => this.handleInputChange(e) }>
                                <option value=''>--Select a color--</option>
                                <option value='black'>Black</option>
                                <option value='brown'>Brown</option>
                                <option value='cream'>Cream</option>
                                <option value='navy-blue'>Navy Blue</option>
                                <option value='orange'>Orange</option>
                                <option value='white'>White</option>>
                            </select>
                            <br/> */}
                            <p>Decoration: </p>
                            <select name='orderDecoration' onChange={ e => this.handleInputChange(e) }>
                                <option value=''>--Select a decoration type--</option>
                                { this.state.orderType !== 'flower'
                                    ? <option value='rose'>Rose</option>
                                    : <option value='pearl'>Pearl</option>
                                }
                                { this.state.orderType !== 'flower'
                                    ? <option value='butterfly'>Butterfly</option>
                                    : <option value='jewel'>Jewel</option>
                                }
                                <option value='other-flower'>Other* Flower</option>
                            </select>
                            <br/>
                            <p>Decoration Color: </p>
                            <select name='orderDecoColor' onChange={ e => this.handleInputChange(e) }>
                                <option value=''>--Select a color--</option>
                                <option value='black'>Black</option>
                                <option value='brown'>Brown</option>
                                <option value='cream'>Cream</option>
                                <option value='navy-blue'>Navy Blue</option>
                                <option value='orange'>Orange</option>
                                <option value='white'>White</option>
                            </select>
                            { this.state.orderType === 'centerpiece'
                                ? <div>
                                    <br/>
                                    <p>Centerpiece Base: </p>
                                    <select name='orderCenterBase' onChange={ e => this.handleInputChange(e) }>
                                        <option value=''>--Select a decoration type--</option>
                                        <option value='round-mirror'>Round Mirror</option>
                                        <option value='square-mirror'>Square Mirror</option>
                                        <option value='round-wood'>Round Wood</option>
                                        <option value='square-wood'>Square Wood</option>
                                        <option value='round-tile'>Round Tile</option>
                                        <option value='square-tile'>Square Tile</option>
                                    </select>
                                </div>
                                : null
                            }
                            { this.state.orderType === 'centerpiece'
                                ? <div>
                                    <br/>
                                    <p>Centerpiece Candle: </p>
                                    <select name='orderCenterCandle' onChange={ e => this.handleInputChange(e) }>
                                        <option value=''>--Select a decoration type--</option>
                                        <option value='enclosed'>Enclosed</option>
                                        <option value='open-tall'>Tall and Open</option>
                                    </select>
                                </div>
                                : null
                            }
                            <br/>
                            <p>Quantity (1 - 20): </p>
                            <input type='number' name='quantity' min='1' max='20' onChange={ e => this.handleInputChange(e) } />
                            <br/>
                            <p>Additional comments: </p>
                            <textarea name='orderRequest' maxLength='300' onChange={ e => this.handleInputChange(e) }/>
                            <div className='character-limit'>Characters: {this.countChar()}</div>
                        </form>