# jsPlumb

[简单中文教程](https://www.cnblogs.com/xcj26/p/9870734.html)  
[官网](http://jsplumb.github.io/jsplumb/home.html)
[gitHub](https://github.com/jsplumb/jsplumb)
[changelog](http://jsplumb.github.io/jsplumb/changelog.html)

> 鉴于目前的版本更新和网络上教程出的时间的早晚的问题，会有一部分网上教程的api有误，建议出现此类问题的时候查看**jsplumb**的changelog；

## concept

- jsPlumb社区版为开发人员提供了一种使用SVG可视化连接其网页上的元素的方法。
- jsPlumb没有外部依赖项。
- 1.7.x版本是最后一个支持IE8的版本。从2.0.0版开始，社区版仅在支持SVG的现代浏览器中工作。

## start

- `npm install jsplumb`
- `import jsplumb from 'jsplumb'`

    ```js
    // 有必要的话，方法尽可能写在ready的callFn中
    jsPlumb.bind("ready", function() {
    ...           
    // your jsPlumb related init code goes here
    ...  
    });
    ```

- 创建实例（create instance）

    ```js
    // jsplumb 会自动在浏览器对象下挂载一个jsPlumb对象的实例，可以直接使用这个对象
    window.jsPlumb;
    // 自己创建一个实例
    const jspInstance = jsPlumb.getInstance();
    ```

- 基础配置
  
    ```js
    // 可以在jsPlumb上挂载一些初始化的基础配置
    jsPlumb.importDefaults({
        ConnectionsDetachable: false, // 禁止修改已建立的链接
    })
    // 在实例上配置一些基本信息
    this.jsplumbInstance = jsPlumb.getInstance(
        {
          Connector: [ // 链接线的配置
            "Bezier", // 生成规则
            {
              gap: 5,
              cornerRadius: 8,
              alwaysRespectStubs: true
            }
          ],
          ConnectionOverlays: [ // 链接线上的overlay，比如箭头
            [
              'Arrow',
              {
                width: 10, 
                length: 10, 
                location: 1
              }
            ]
          ],
          PaintStyle: { // 链接线样式（style）
            stroke: "#1890ff",
            strokeWidth: 2
          },
          HoverPaintStyle: { // 链接线hover style
            stroke: "#409EFF",
            strokeWidth: 3
          },
          EndpointStyle: { // 端点样式（endPoint style）
            fill: "#456",
            stroke: "#2a2929",
            strokeWidth: 1,
            radius: 3
          },
          EndpointHoverStyle: { // 端点hover style
            fill: "pink"
          },
          Container: 'linker', // 整个jsplumb的容器，会在后面使用draggable的时候作为node拖拽的容器，可以用来限制是否可以拖拽出容器，.draggable(node, {containment: 'parent'})
        }
      )
    ```

## node

> 这里的节点可以自己在页面中创建，可以是任意的样式，使用**nodeList**表示节点集合，**node**表示单个节点

## link(conn) 连接

```js
conn是jsplumb返回的连线实体
conn.getPaintStyle(); // 获取连线的样式
conn.setPaintStyle({stroke: '', strokeWidth: 2}); // 修改连线的样式
conn.repaint()
```

## endPoint

- endPoint 是用来作为链接的source或者target；
- endPoint 在不是特别声明的情况下，endPoint是单独的，如果特别声明，也可以将node作为endPoint；

    ```js
    // 将id='A'的元素作为endPoint
    jsPlumb.makeSource('A', {
        endpoint:"Dot",
        anchor: "Continuous"
    })
    ```

- endPoint 在创建的时候可以给其赋值一个uuid作为唯一标识
  
    ```js
    // 创建带uuid的endPoint；为什么要uuid：在链接的时候可以使用uuid直接创建链接；
    jspInstance.addEndPoint(node, {anchor: 'Right', uuid: `${uuid}`})
    ```

### endPoint cfg&method&event

- cfg
  
    ```json
    let endPointerCfg = {
        isSource: true, // 是否可以作为source
        isTarget: true, // 是否可以作为target
        maxConnections: -1, // endPoint的最大链接数，-1表示不限制
        anchors: ['Right','Left'], // endPoint的创建位置
        uuid: `${uuid}`
        ...
    }
    ```

- methods
  
    ```js
    <endPoint实例>.getUuid(); // 获取当前endPoint的uuid info.sourceEndpoint.getUuid()
    ```

- event
  
    ```js
    暂无
    ```

## link

> link在本doc中是用来描述链接关系的， endPoint(node)-link-endPoint(node)

### link event

- events
  
    ```js
    // click
    // 直接在实例上绑定link的click事件
    this.jsplumbInstance.bind('click', (conn, originalEvent) => {
        if (window.prompt('确定删除所点击的链接吗？ 输入y确定') === 'y') {
            this.jsplumbInstance.deleteConnection(conn);
        }
    })
    ```

    ```js
    // onCreate
    // 链接的创建事件监听
    // info是返回的链接的信息，包含sourceEndpoint、targetEndpoint等
    // 这里可以使用endPoint的getUuid()来获取endPoint的uuid（作为以后初始化的时候创建link用）
    this.jsplumbInstance.bind('connection', (info) => {
        const link = {
            name: 'link',
            uuid: `link-${this.getUUID()}`,
            sourceId: info.sourceId,
            targetId: info.targetId,
            sourceEndpointUuid: info.sourceEndpoint.getUuid(),
            targetEndpointUuid: info.targetEndpoint.getUuid(),
        };
        this.flow.linkList.push(link)
    })
    ```

## methods list

- `jsPlumb.getInstance()`
- `jsPlumb.importDefaults(<config>)` 设置默认配置
- `jsPlumb.batch(callback<function>, true)` 当对图形做批量操作的时候如果单独一个个绘制是很浪费性能的，可以在昨晚所有的操作之后一次性重绘
- `jsPlumb.bind(<event>, <callFunction>)`

  - events: connection, connectionDetached, connectionMoved, click, dblclick, endpointClick, endpointDblClick, contextmenu, beforeDrop, beforeDetach, zoom, Connection Events, Endpoint Events, Overlay Events, Unbinding Events
  - beforeDrop：可以做连线前的校验，return false则不建立连接
  - connection：连接建立的监听函数

- `jsPlumb.addEndPoint(<els>, <endPointConfig>)`

  - els: id/dom
  - endPointConfig: [link](#endpoint-cfg-method-event)
- `<endPoint>.getUuid()` 获取endPoint的uuid
- `jsPlumb.connect()` 创建链接
  - 方法一：根据node的Dom元素id创建（弊端是创建的链接自动生成的endPoint会在node的下方）

  ```js
      jsPlumb.connect({
          source: 'item_left',
          target: 'item_right',
          endpoint: 'Dot'
      })
  ```

  - 方法二：根据endPoint的uuid创建（优点：解决方法一的弊端；弊端：需要的一定的代码量和逻辑处理）

  ```js
      jsPlumb.connect({
          uuids: [link.sourceEndpointUuid, link.targetEndpointUuid]
      })
  ```

- `.toggleDraggable(node.id)` 切换元素的draggable状态
- `.makeTarget(node.id)` 设置为connetcion的target
- `.makeSource(node.id)` 设置为connetcion的source
- `.unmakeTarget(node.id)` 解除为connetcion的target
- `.unmakeSource(node.id)` 解除为connetcion的source
- `.getConnections({source: <sourceId>,target: <targetId>})` 返回值是一个数组
- `.deleteConnection(<.getConnections的返回值可以作为参数>)`
- `.detach(<conn>)` 删除conn
- `.deleteConnectionsForElement(el, [params])` 根据el删除所有的conn
- `.detachEveryConnection();` 删除所有的conn
- `.removeEveryConnection` 删除所有的conn
- `.setZoom(<zoomNum>)` 当对整个画布进行缩放的时候
- `.deleteEndpoint(ep);`  删除所有的指定ep
- `.deleteEveryEndpoint` 删除所有的endpoint
- `.remove(<id | selector>)` 删除node，会同时删除conn、DOM
- `.empty(<id | selector>)` 删除节点下的所有child elements and all collections
- `.addToDragSelection()` 添加选择的节点
- `.removeFromDragSelection()` 删除选择的节点
- `.getDragSelection()` 获取选择的节点
- `.clearDragSelection()` 清楚所有选择的节点

## 自行搭建一个流程设计器的思路

```js
let flowData = {
    nodeList: [],
    linkList: [],
}
```

1. 基于现有的流程处理框架jsPlumb的界面逻辑实现，自己在jsPlumb暴露的各个钩子中实现数据的维护；
2. 在create node btn或者拖拽的时候，`flowData.nodeList.push(node)`；
3. 在`bind('connection', <fn>)`的时候， `flowData.linkList.push(link)`；
4. 在`bind('click', <fn>)`的时候，如果删除link，则`flowData.linkList delete (link)`；
5. 初始化数据的实现：
    5.1 根据flow.nodeList，遍历生成node；
    5.2 在node完全渲染之后，生成endPoint（考虑新建的时候就将endPoint的uuid保存，便于后面创建链接）
    5.3 node，endPoint都渲染完成之后，创建链接；

## 附录

### vue源码

> 基于ant-design-vue， 实现了新建（按钮或者拖拽），编辑（流程编辑，节点信息编辑），初始化，选择节点，批量拖拽，画布拖拽

```vue
<template>
    <a-spin :spinning='loading'>
        <a-layout id='flow-container'>
            <!-- tool sider begin -->
            <a-layout-sider class='left-sider'>
                <Actions></Actions>
            </a-layout-sider>
            <!-- tool sider end -->

            <a-layout-content>
                <!-- 视口 -->
                <div id='view'>
                    <!-- 工具栏  -->
                    <div class='flow-design-tools-container'>
                        <span class='model-name'>{{model.name}}</span>
                        {{`缩放: ${canvas.scale}`}}
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>放大</span>
                            </template>
                            <a-icon @click='zoomIn' type='plus-circle' class='flow-design-tools-btn'></a-icon>
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>缩小</span>
                            </template>
                            <a-icon @click='zoomOut' type='minus-circle' class='flow-design-tools-btn'></a-icon>
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>画布拖拽</span>
                            </template>
                            <a-icon type="drag" class='flow-design-tools-btn' @click='changeMode("CANVAS_DRAG")'/>
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>选择节点</span>
                            </template>
                            <a-icon type="select" class='flow-design-tools-btn'  @click='changeMode("SELECT_NODE")'/>
                        </a-tooltip>
                        <a-tooltip placement="top">
                            <template slot="title">
                                <span>保存</span>
                            </template>
                            <a-icon @click='getNodeLink' type='save' class='flow-design-tools-btn save-btn'></a-icon>
                        </a-tooltip>
                        <a-tooltip placement="left">
                            <template slot="title">
                                <div class='help-info'>
                                    <h4>帮助</h4>
                                    <section>
                                        <div><span>节点选择</span></div>
                                        <div><span>1.工具栏选择‘选择节点’模式</span></div>
                                        <div><span>2.画布上拖拽选择区域</span></div>
                                        <div><span>3.多节点下的单节点选择：shift+鼠标左击</span></div>
                                    </section>
                                </div>
                            </template>
                            <a-icon type='question' class='flow-design-tools-btn'></a-icon>
                        </a-tooltip>
                    </div>
                    <!-- 画布 -->
                    <div id='canvas' style="" v-on:drop="ondrop" @dragover="ondragOver">
                        <div id='select-area'></div>
                        <div class='actionItem' :id='item.uuid' :key='item.uuid' v-for='item in flow.nodeList' :style='{"left": item.x+"px", "top": item.y+"px"}' @click='selectNodeSingleHandler(item)'>
                            <div class='tools'>
                                <a-tooltip placement="top">
                                    <template slot="title">
                                        <span>编辑</span>
                                    </template>
                                    <a-icon class='tool-item' type='setting' @click.stop='editNode(item)'></a-icon>
                                </a-tooltip>
                                <a-tooltip placement="top">
                                    <template slot="title">
                                        <span>复制</span>
                                    </template>
                                    <a-icon class='tool-item' type="copy"  @click.stop='copyNode(item)'/>
                                </a-tooltip>
                                <a-tooltip placement="top">
                                    <template slot="title">
                                        <span>删除</span>
                                    </template>
                                    <a-icon class='tool-item' type='delete' @click.stop='deleteNode(item)'></a-icon>
                                </a-tooltip>
                            </div>
                            <div class='content'>
                                <div class='title'>
                                    <a-tooltip placement="bottom">
                                        <template slot='title'>{{item.action.actionDes}}</template>
                                        {{item.action.actionDes}}</a-tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a-layout-content>

            <!-- node edit modal begin-->
            <a-modal :title="`${modal.editNodeCopy.action.actionAlias}（${modal.editNodeCopy.uuid}）`" v-model='modal.visiable' v-if='modal.visiable' :footer='null' width="800px">
                <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                    <a-form-item label='算子描述'>
                        <a-input v-model='modal.editNodeCopy.action.actionDes'></a-input>
                    </a-form-item>
                </a-form>
                <FormCreate v-model="fApi" :rule="modal.editNodeCopy.formConstruct.form" :option="option"></FormCreate>
                <div class='node-edit-footer'>
                    <a-button @click='editNodeOk' type='primary'>确定</a-button>
                </div>
            </a-modal>
            <!-- node edit modal end-->
        </a-layout>
    </a-spin>
</template>

<script>
import Vue from 'vue'
import jsplumb from 'jsplumb'
import Actions from './components/Actions'
import FormCreate from '@form-create/ant-design-vue'
import { maker } from '@form-create/ant-design-vue'
import { cloneDeep } from 'lodash'
import { postAction, getAction } from '@/api/manage'
Vue.use(FormCreate)

function canvasMove(el_id, container_id) {
    const el = document.querySelector(el_id);
    const container = document.querySelector(container_id);
    let el_style_c = getComputedStyle(el);
    let container_style_c = getComputedStyle(container);
    let start = { x: null, y: null };
    el.style.cursor = 'grab';
    el.onmousedown = function(event) {
        el.style.cursor = 'grabbing'
        let e = event || window.event;
        let mouse_start = { x: e.clientX, y: e.clientY }
        let el_start = { top: window.getComputedStyle(el).top.replace(/px/g, '') || 0, left: window.getComputedStyle(el).left.replace(/px/g, '') || 0 }

        el.onmousemove = function(event) {
            let e = event || window.event
            let diff_x = e.clientX - mouse_start.x
            let diff_y = e.clientY - mouse_start.y

            let top = parseInt(el_start.top) + parseInt(diff_y)
            let left = parseInt(el_start.left) + parseInt(diff_x)
            el.style.top = top + 'px'
            el.style.left = left + 'px'
        }

        el.onmouseup = function() {
            el.onmousemove = null
            el.onmouseup = null;
            el.style.cursor = 'grab'
        }
    }
}
function reset(el_id, container_id) {
    const el = document.querySelector(el_id)
    const container = document.querySelector(container_id)
    el.style.top = '-9000px'
    el.style.left = '-16000px'
}
let endPointerCfg = {
    isSource: true,
    isTarget: true,
    maxConnections: -1
    // anchors: ['Right','Left']
}
const designModeList = {
    CANVAS_DRAG: 'CANVAS_DRAG', // 画布拖拽
    SELECT_NODE: 'SELECT_NODE', // 节点选择
}
export default {
    name: 'FlowDesign',
    data() {
        var self = this
        return {
            loading: false,
            fApi: {},
            //组件参数配置
            option: {
                submitBtn: false,
                resetBtn: false
            },
            jsplumbInstance: null,
            flow: {
                nodeList: [],
                linkList: []
            },
            designMode: null,
            designModeList: designModeList,
            linkIndexObj: {}, // 连接的快速索引对象，key：链接的`${link.sourceId}_${link.targetId}`，value：链接的信息
            modal: {
                visiable: false,
                data: null,
                originNode: null,
                editNodeCopy: null
            },
            canvas: {
                scale: 1
            },
            model: {
                name: '',
            }
        }
    },
    props: {
        modelId: {
            type: String,
            default: () => ''
        },
        options: {
            type: Object,
            default: () => {
                return {
                    getUrl: '',
                    postUrl: ''
                }
            }
        }
    },
    components: {
        Actions
    },
    methods: {
        getUUID: function uuid(len, radix) {  
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');  
            var uuid = [], i;  
            radix = radix || chars.length;  
        
            if (len) {  
            // Compact form  
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];  
            } else {  
            // rfc4122, version 4 form  
            var r;  
        
            // rfc4122 requires these characters  
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';  
            uuid[14] = '4';  
        
            // Fill in random data.  At i==19 set the high bits of clock sequence as  
            // per rfc4122, sec. 4.1.5  
            for (i = 0; i < 36; i++) {  
                if (!uuid[i]) {  
                r = 0 | Math.random()*16;  
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];  
                }  
            }  
            }  
        
            return uuid.join('');  
        } ,
        initjsPlumb() {
            const _this = this;
            // 默认配置
            // 阻止断开链接
            jsPlumb.importDefaults({
                ConnectionsDetachable: false, //禁止修改已建立的链接
            })
            this.jsplumbInstance = jsPlumb.getInstance({
                Connector: [
                    'Bezier',
                    {
                        gap: 5,
                        cornerRadius: 8,
                        alwaysRespectStubs: true
                    }
                ],
                ConnectionOverlays: [
                    [
                        'Arrow',
                        {
                            width: 10,
                            length: 10,
                            location: 1,
                        }
                    ],
                    [
                        'Label',
                        {
                            cssClass:"component",
                            label :"hello everyone",
                            // label :"<div class='DCon'>啊啊啊<div>",
                            location:0.4,
                            id:"label",
                            events: {
                                click: function() {
                                    console.log(9999)
                                },
                                mouseenter: function() {}
                            }
                        }
                    ]
                ],
                // link line color
                PaintStyle: {
                    stroke: '#bae7ff',
                    strokeWidth: 1
                },
                HoverPaintStyle: {
                    stroke: '#409EFF',
                    strokeWidth: 3
                },
                EndpointStyle: {
                    fill: '#1890FF',
                    stroke: '#1890FF',
                    strokeWidth: 1,
                    radius: 4
                },
                EndpointHoverStyle: {
                    fill: '#1890FF'
                },
                Container: 'canvas'
            })
            // delete link
            this.jsplumbInstance.bind('click', (conn, originalEvent) => {
                this.$confirm({
                    title: '提示',
                    content: '确定删除所点击的链接吗？',
                    onOk: () => {
                        this.jsplumbInstance.deleteConnection(conn);
                        this.flow.linkList = this.flow.linkList.filter(e => !(e.sourceId == conn.sourceId && e.targetId == conn.targetId));
                        delete this.linkIndexObj[`${conn.sourceId}_${conn.targetId}`];
                        this.updateInputFromOutput(conn, 'delete');
                    },
                    onCancel: () => {}
                })
            })
            this.jsplumbInstance.bind('beforeDrop', function(info) {
                if(_this.linkIndexObj[`${info.sourceId}_${info.targetId}`]) {
                    _this.$message.warning('不能创建重复链接');
                    return false;
                };
                if(_this.linkIndexObj[`${info.targetId}_${info.sourceId}`]){
                    _this.$message.warning('不能创建循环链接');
                    return false;
                };
                if (info.sourceId == info.targetId) {
                    _this.$message.warning('不能与自身创建链接');
                    return false
                }
                return true;
            })
            // create link
            this.jsplumbInstance.bind('connection', info => {
                // console.log(info)
                // console.log(info.sourceEndpoint)
                // console.log(info.sourceEndpoint.getUuid(), info.sourceId)
                // console.log(info.targetEndpoint.getUuid(), info.targetId)
                const link = {
                    name: 'link',
                    uuid: `link-${this.getUUID(8, 16)}`,
                    sourceId: info.sourceId,
                    targetId: info.targetId,
                    sourceEndpointUuid: info.sourceEndpoint.getUuid(),
                    targetEndpointUuid: info.targetEndpoint.getUuid()
                };
                this.createLink(link);
                this.updateInputFromOutput(link);
            })
        },
        createNode(nodeObj) {
            // 当nodeObj存在。根据已有的信息创建node，否则创建新的node
            // console.log('nodeObj', nodeObj)
            const _this = this;
            let uuid = this.getUUID(8, 16)
            let nodeUUID = nodeObj.uuid || `node-${uuid}`
            // 创建新节点不需要兼容，已创建的节点需要兼容处理
            let node = {
                // 节点的位置信息
                uuid: nodeUUID,
                endPointRightUuid: nodeObj.endPointRightUuid || `endPointRightUuid-${uuid}`,
                endPointLeftUuid: nodeObj.endPointLeftUuid || `endPointLeftUuid-${uuid}`,
                x: nodeObj.x || 0,
                y: nodeObj.y || 0,
                // 业务信息
                id: nodeUUID,
                action: nodeObj.action,
                formConstruct: JSON.parse(nodeObj.action.params), // 这个数据字段只在节点创建后页面的生命周期中存在，数据保存的时候，会在getNodeLink<function>中删除
                params: nodeObj.params || null,
            }
            this.flow.nodeList.push(node)
            this.$nextTick(function() {
                let els = document.getElementById(`${node.uuid}`)
                let l = this.jsplumbInstance.addEndpoint(els, endPointerCfg, {
                    anchors: 'Right',
                    uuid: node.endPointRightUuid
                })
                let r = this.jsplumbInstance.addEndpoint(els, endPointerCfg, {
                    anchors: 'Left',
                    uuid: node.endPointLeftUuid
                })
                this.jsplumbInstance.draggable(els, {
                    containment: 'parent', // 只能在父元素内drag
                    stop: function(e) { // 只有当前鼠标所在的移动节点会触发，批量移动的时候，dragSelection中的所有节点不会触发此事件，所以需要手动更新数据
                        node.x = e.pos[0];
                        node.y = e.pos[1];
                        _this.updateSelectNodePositionByBatchMove();
                    },
                })
            })
        },
        createLink(link) {
            this.flow.linkList.push(link);
            this.createLinkIndexObj(link);
        },
        createConnection(link) {
            // 根据endpoint的uuid创建connection
            this.jsplumbInstance.connect({
                uuids: [link.sourceEndpointUuid, link.targetEndpointUuid]
            });
            this.createLinkIndexObj(link);
        },
        editNode(item) {
            console.info('editNode', item);
            this.modal.originNode = item;
            this.modal.editNodeCopy = cloneDeep(item);
            this.modal.visiable = true;
            this.$nextTick(() => {
                this.fApi.setValue(item.params);
            });
        },
        deleteNode(item) {
            this.jsplumbInstance.remove(item.uuid);
            this.flow.nodeList.splice(this.flow.nodeList.findIndex(e => e.uuid == item.uuid), 1);
            const result_link = this.flow.linkList.filter(l => {
                if(l.sourceId == item.uuid) {
                    this.updateInputFromOutput(l, 'delete');
                }
                return l.sourceId != item.uuid && l.targetId != item.uuid
            })
            this.flow.linkList = result_link;
        },
        copyNode(item) {
            const copy_node = cloneDeep(item)
            copy_node.uuid = null; 
            copy_node.endPointRightUuid = null; 
            copy_node.endPointLeftUuid = null; 
            copy_node.x = copy_node.x + 20;
            copy_node.y = copy_node.y + 20;
            copy_node.action.actionDes = copy_node.action.actionDes;    
            this.createNode(copy_node);
        },
        ondragStart(e) {
            e.dataTransfer.setData('text', JSON.stringify({ name: 'new node', uuid: null }))
        },
        ondragOver(e) {
            e.preventDefault()
        },
        ondrop(e) {
            // console.log(e)
            let action = JSON.parse(e.dataTransfer.getData('text'));
            // console.log('=====',createNodeObj)
            let createNodeObj = {};
            createNodeObj.x = e.layerX;
            createNodeObj.y = e.layerY;
            // + 新增对象保存了算子的信息
            action.actionDes = action.actionDes || '默认描述';
            createNodeObj.action = action;
            this.createNode(createNodeObj)
        },
        passInitFlow() {
            // console.log('this.modelId', this.modelId)
            if (!this.modelId) return
            reset('#canvas', '#view');
            this.loading = true
            getAction(this.options.getUrl, { id: this.modelId }).then(res => {
                this.loading = false
                if (!res.success) {
                    this.$message.warning(res.message)
                    return;
                }
                if (!res.result.model || res.result.model == '{}') {
                    console.log('该模型尚未配置算子信息')
                    return
                }
                const origin = JSON.parse(res.result.model);
                this.model.name = res.result.modelName;
                this.jsplumbInstance.batch(() => {
                    origin.actions.forEach(n => {
                        this.createNode(n);
                    })
                    this.$nextTick(() => {
                        origin.dag.forEach(l => {
                            this.createConnection(l)
                        })
                    })
                })
            });
        },
        editNodeOk() {
            this.fApi.submit(formData => {
                this.modal.originNode.formConstruct = this.modal.editNodeCopy.formConstruct;
                this.modal.originNode.action.actionDes = this.modal.editNodeCopy.action.actionDes;
                this.modal.originNode.params = formData;
                this.modal.visiable = false;
                // console.log('editNodeOk', this.modal.originNode);
                this.flow.linkList.forEach(e => {
                    if(e.sourceId ==  this.modal.originNode.uuid) {
                        this.updateInputFromOutput(e);
                    }
                });
            })
        },
        getNodeLink() {
            // console.log(JSON.stringify(this.flow.nodeList))
            // 格式化数据
            let result = {}
            let flow = cloneDeep(this.flow)
            result.actions = flow.nodeList.map(e => {
                delete e.formConstruct;
                return e;
            })
            result.dag = flow.linkList.map(e => {
                return {
                    fromId: e.sourceId,
                    toId: e.targetId,
                    ...e
                }
            })
            console.log(JSON.stringify(result))
            this.loading = true
            postAction(this.options.postUrl, {
                id: this.modelId,
                model: JSON.stringify(result)
            }).then(res => {
                this.loading = false
                if (!res.success) {
                    this.$message.warning(res.message)
                    return
                }
                this.$message.success('操作成功')
            })
        },
        zoomIn() {
            const el = document.querySelector('#canvas')
            if (this.canvas.scale >= 1) return
            this.canvas.scale = (this.canvas.scale * 10 + 1) / 10
            el.style.transform = `scale(${this.canvas.scale})`
            this.jsplumbInstance.setZoom(this.canvas.scale)
        },
        zoomOut() {
            const el = document.querySelector('#canvas')
            if (this.canvas.scale <= 0.5) return
            this.canvas.scale = (this.canvas.scale * 10 - 1) / 10
            el.style.transform = `scale(${this.canvas.scale})`
            this.jsplumbInstance.setZoom(this.canvas.scale)
        },
        /**
         * 创建链接的快速索引
        */
        createLinkIndexObj(link) {
            this.linkIndexObj[`${link.sourceId}_${link.targetId}`] = link;
        },
        /**
        * schema自动传递
        * link<flow.linkList[0]>
        * @param type : update创建或者修改的时候触发；delete删除的时候触发
        */
        updateInputFromOutput(link, type = 'update') {
            // console.log(type)
            // console.log('source:', link.sourceId)
            // console.log('target:', link.targetId)
            let source = this.flow.nodeList.filter(e => e.uuid == link.sourceId)[0];
            let target = this.flow.nodeList.filter(e => e.uuid == link.targetId)[0];
            // console.log('source:', source)
            // console.log('target:', target)

            if(!target.params) { //算子只是拖拽，尚未编辑
                target.params = {
                    "inputs": []
                };
            }
            switch(type) {
                case 'update': 
                    let source_obj_val = source.params['outputColumns'][0];
                    const output_val = source_obj_val['immutableColumns'].split(',').filter(e => e.trim() != '').concat(source_obj_val['mutableColumns'].split(',').filter(e => e.trim() != '')).join(',');
                    let target_input = target.params["inputs"].filter(e => e.fromId == link.sourceId);
                    if(target_input.length == 1) {
                        target_input[0].fromName = source.action.actionDes;
                        target_input[0].columns = output_val;
                    } else {
                        target.params["inputs"].push({
                            fromId: link.sourceId,
                            fromName: source.action.actionDes,
                            columns: output_val
                        });
                    }
                    break;
                case 'delete':
                    target.params["inputs"] = target.params["inputs"].filter(e => e.fromId != link.sourceId);
                    break;
                default: 
                    console.error('非正常选项！');
                    break;

            }
            
        },

        // 交互
        /**
         * @description 切换画布的模式
         * @param mode <string>
        */
        changeMode(mode) {
            const _this = this;
            const el = document.querySelector('#canvas');
            el.onmousedown = null;
            el.onmousemove = null;
            el.onmouseup = null;
            this.designMode = mode;
            switch(mode) {
                case _this.designModeList.CANVAS_DRAG: 
                    canvasMove('#canvas', '#view');
                    break;
                case _this.designModeList.SELECT_NODE:
                    this.selectNodeHandler('#canvas', '#view', '#select-area'); // 批量选择
                    break;
                default: 
                    console.error(`不能识别的模式:${mode}`);
                    break;
            }
        },
        selectNodeHandler(el_id, container_id, select_area_id) {
            const _this = this;
            function clearSelectArea(el) {
                el.style.top = '0px'; 
                el.style.left = '0px'; 
                el.style.width = '0px'; 
                el.style.height = '0px'; 
            }
            function generateSelectNode(x1, y1, x2, y2) {
                _this.jsplumbInstance.clearDragSelection();
                let selectNodes = _this.flow.nodeList.filter(e => {
                    return e.x > x1 && e.x < x2 && e.y > y1 && e.y < y2;
                })
                selectNodes.forEach(e => _this.jsplumbInstance.addToDragSelection(e.uuid));
            }
            const el = document.querySelector(el_id);
            const container = document.querySelector(container_id);
            const selectAreaEl = document.querySelector(select_area_id);
            el.style.cursor = "crosshair";
            el.onmousedown = function(e) {
                const event = e || window.event;
                const start_p = {x: e.clientX, y: e.clientY};
                const origin_p = {x: e.offsetX, y: e.offsetY};
                let move_p = null;
                selectAreaEl.style.top = origin_p.y + 'px'; 
                selectAreaEl.style.left = origin_p.x + 'px'; 
                el.onmousemove = function(e) {
                    const event = e || windwo.event;
                    move_p = {x: e.clientX, y: e.clientY};
                    selectAreaEl.style.width = (move_p.x - start_p.x) / _this.canvas.scale + 'px';
                    selectAreaEl.style.height = (move_p.y - start_p.y) / _this.canvas.scale + 'px';
                    el.onmouseup = function() {
                        clearSelectArea(selectAreaEl);
                        generateSelectNode(origin_p.x, origin_p.y, origin_p.x + move_p.x - start_p.x, origin_p.y + move_p.y - start_p.y);
                        el.onmousemove = null;
                        el.onmouseup = null;
                    };
                };
                el.onmouseup = function() {
                    clearSelectArea(selectAreaEl);
                    el.onmousemove = null;
                    el.onmouseup = null;
                };
            };
        },
        selectNodeSingleHandler(item) {
            const e = window.event;
            e.preventDefault();
            if(this.designMode != this.designModeList.SELECT_NODE) return;
            if(e.shiftKey) {
                if(Array.from(document.querySelector(`#${item.uuid}`).classList).indexOf('jtk-drag-selected') > -1)
                    this.jsplumbInstance.removeFromDragSelection(item.uuid);
                else
                    this.jsplumbInstance.addToDragSelection(item.uuid);
            }
        },
        /**
         * @description 批量选择的时候，移动批量的元素，框架只会stop事件只在move的当前元素触发，其余元素需要手动触发
         * 
        */
        updateSelectNodePositionByBatchMove() {
            const selections = this.jsplumbInstance.getDragSelection();
            if(selections.length === 0) 
                return;
            selections.forEach(sel => {
                const node = this.flow.nodeList.filter(e => e.uuid == sel.el.id)[0];
                node.x = sel.el.style.left.split('px')[0];
                node.y = sel.el.style.top.split('px')[0];
            })
        }
    },
    mounted() {
        this.initjsPlumb();
        this.passInitFlow();
        // canvasMove('#canvas', '#view');
    },
    watch: {
        modelId: function(newVal, oldVal) {
            this.jsplumbInstance.deleteEveryConnection()
            this.jsplumbInstance.deleteEveryEndpoint()
            this.flow = {
                nodeList: [],
                linkList: []
            }
            this.passInitFlow();
        }
    }
}
</script>

<style lang='less'>
@flow-item-tools-bg: #e8e8e8;
@flow-item-tools-btn-icon-color: #1890ff;
@flow-item-content-bg: #fff;
#flow-container {
    height: 100vh;
    border: 1px solid #a9a9a9;
    .left-sider {
        background: #fff;
        border-right: 1px solid #d9d9d9;
        overflow: auto;
    }
    #view {
        height: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        background: #fff;
        .flow-design-tools-container {
            position: absolute;
            margin: 4px 10px;
            width: calc(100% - 20px);
            z-index: 10;
            color: #fff;
            background-color: rgba(90, 90, 90, 0.85);
            padding: 8px 25px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            border-radius: 4px;
            .model-name{
                margin-right: auto;
            }
            .flow-design-tools-btn {
                cursor: pointer;
                color: #fff;
                margin-left: 15px;
            }
        }
        #canvas {
            position: absolute;
            top: -9000px;
            left: -16000px;
            height: 18000px;
            width: 32000px;
            border: 1px solid #a9a9a9;
            background: #f0f2f5;
            &>#select-area{
                position: absolute;
                border: 1px solid #1890ff;
                z-index: 2;
            }
        }
    }
}
.actionItem {
    position: absolute;
    z-index: 1;
    display: inline-block;
    border: 1px solid #e6e0e0;
    border-radius: 4px;
    transform: rotate(0deg);
    width: 150px;
    cursor: move;
    &.jtk-drag-selected{
        border: 1px solid #1890ff;
    }
    .tools {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        display: flex;
        justify-content: flex-end;
        align-content: center;
        padding: 6px 15px;
        background: @flow-item-tools-bg;
        .anticon {
            color: @flow-item-tools-btn-icon-color;
        }
        .tool-item{
            &:nth-child(1){
                margin-right: auto;
            }
            &:not(:last-child):not(:first-child){
                margin-right: 10px; 
            }
        }
    }
    .content {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: 10px 15px;
        background: @flow-item-content-bg;
        .title {
            & > span {
                display: inline-block;
                width: 100%;
                color: #475061 !important;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
.actionItem p {
    word-break: break-all;
}
.node-edit-footer {
    text-align: right;
}
.jtk-endpoint {
    z-index: 2;
    &:hover{
        cursor: crosshair;
    }
}
svg.jtk-connector:hover {
    cursor: auto;
}
.form-create{
    i.anticon.anticon-plus-circle{
        font-size: 14px!important;
    }
}
.help-info{
    h1,h2,h3,h4,h5,h6{
        color: #fff;
    }
    span{
        font-size: 12px;
    }
}
</style>

```

## Docs

> overlays

- Arrow
Draws an arrow, using four points: the head and two tail points, and a foldback point, which permits the tail of the arrow to be indented. Available constructor arguments for this Overlay are:
width - width of the tail of the arrow
length - distance from the tail of the arrow to the head
location - where, either as a proportional value from 0 to 1 inclusive, or as an absolute value (negative values mean distance from target; positive values greater than 1 mean distance from source) the Arrow should appear on the Connector
direction - which way to point. Allowed values are 1 (the default, meaning forwards) and -1, meaning backwards
foldback - how far along the axis of the arrow the tail points foldback in to. Default is 0.623.
paintStyle - a style object in the form used for paintStyle values for Endpoints and Connectors.

- Plain Arrow
This is just a specialized instance of Arrow in which jsPlumb hardcodes foldback to 1, meaning the tail of the Arrow is a flat edge. All of the constructor parameters from Arrow apply for PlainArrow.

- Diamond
This is a specialized instance of Arrow in which jsPlumb hardcodes 'foldback' to 2, meaning the Arrow turns into a Diamond. All of the constructor parameters from Arrow apply for Diamond.

- Label
Provides a text label to decorate Connectors with. The available constructor arguments are:
label - The text to display. You can provide a function here instead of plain text: it is passed the Connection as an argument, and it should return a String.
cssClass - Optional css class to use for the Label. This is now preferred over using the labelStyle parameter.
labelStyle - Optional arguments for the label's appearance. Valid entries in this JS object are:
font - a font string in a format suitable for the Canvas element
fill - the color to fill the label's background with. Optional.
color - the color of the label's text. Optional.
padding - optional padding for the label. This is expressed as a proportion of the width of the label, not in pixels or ems.
borderWidth - optional width in pixels for the label's border. Defaults to 0.
borderStyle - optional. The color to paint the border, if there is one.
location - As for Arrow Overlay. Where, either proportionally from 0 to 1 inclusive, or as an absolute offset from either source or target, the label should appear.
See also the Labels page, which has a more thorough discussion of how to work with labels in the Toolkit edition.

- Custom

The Custom Overlay allows you to create your own Overlays, which jsPlumb will position for you. You need to implement one method - create(component) - which is passed the component on which the Overlay is located as an argument, and which returns either a DOM element or a valid selector from the underlying library:

```js
var conn = jsPlumb.connect({
  source:"d1",
  target:"d2",
  paintStyle:{
    stroke:"red",
    strokeWidth:3
  },
  overlays:[
    ["Custom", {
      create:function(component) {
        return $("<select id='myDropDown'><option value='foo'>foo</option><option value='bar'>bar</option></select>");                
      },
      location:0.7,
      id:"customOverlay"
    }]
  ]
});
```

Here we have created a select box with a couple of values, assigned to it the id of 'customOverlay' and placed it at location 0.7. Note that the 'id' we assigned is distinct from the element's id. You can use the id you provided to later retrieve this Overlay using the getOverlay(id) method on a Connection or an Endpoint.
