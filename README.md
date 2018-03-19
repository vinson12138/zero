## 一、zero框架的大致结构
游戏由若干个场景构成，每个场景包含若干个层(Layer)，这些层就是MVC模型的`View`部分，每个Layer都可以有一个`Controller`和`Model`与之对应，完成相应的功能。

```
graph LR
SceneA-->LayerA1
SceneA-->LayerA2
SceneA-->LayerA3

LayerA1-->ControllerA1
ModelA1-->ControllerA1

LayerA2-->ControllerA2
ModelA2-->ControllerA2

LayerA3-->ControllerA3
ModelA3-->ControllerA3


SceneB-->LayerB1
SceneB-->LayerB2

LayerB1-->ControllerB1
ModelB1-->ControllerB1

LayerB2-->ControllerB2
ModelB2-->ControllerB2
```
## 二、场景的切换
使用`SceneMgr.load(sceneClassName)`来控制场景的切换，当然何时切换场景，以及切换到哪个场景一般都是由场景内的某个`Controller`来控制的。

## 三、`View`与`Controller`如何通信?
**2.1 `Controller`向`View`通信**

每个`Controller`都会保存对应`View`的实例，因此`Controller`是可以很方便地调用`View`类中的方法。

**2.2 `View`向`Controller`通信**

`View`向`Controller`通信则是通过事件派发实现的。在`Controller`中对`View`添加可能的事件监听，然后在`View`中执行某些交互操作时，派发相应的事件。这样`Controller`就能处理`View`上的操作了。

## 四、全局与`Controller`如何通信?
这里的全局一般指的是服务器传来某些消息，需要通过某些`Controller`来更新`View`。对此，zero使用了观察者模式来实现这个功能。

有一个名为`NotificationCenter`的被观察者类，这个类负责发出服务器传来的消息通知，注册到`NotificationCenter`上，并且订阅了通知的观测者类（也是`Controller`）就会得到通知，并进行处理。

## 五、`Controller`与`Controller`如何通信?
某个`Controller A`如果想向`Controller B`通信，则需要通过`NotificationCenter`获取到这个`Controller B`，然后调用`B.handleNotification()`方法来通知`B`处理某个消息。

## 示例Demo

APK: https://github.com/Neo12138/zero/proj.app/app-release-unaligned.apk

游戏大厅界面

![image](https://github.com/Neo12138/zero/proj.app/images/zero.rpg.main.png)

游戏内

![image](https://github.com/Neo12138/zero/proj.app/images/zero.rpg.game.png)


