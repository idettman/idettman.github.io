PoorPhy
=======

A very very simple 2D Physics Engine in JS



================

*** 虽然文档迟迟没有出来, 但是我可从来没有放弃过对这个库的维护哦***



## FAQ： 为什么还没有文档? 
一定有朋友很好奇: 我每天都会一点点的完善这个项目 , 可是为什么迟迟没有文档推出?

原因只有一个: **API尚未稳定**。

何时会稳定？我觉得一个类库绝对不应该是作者拍脑袋憋出来的，一定要从实际项目中萃取出来，或者说经过至少一个项目的磨练才能拿出来见人。所以 我最近正在用PoorPhy开发个东西，等开发的差不多时PoorPhy的第一版API应该就会稳定了。到时候类库的文档一定会推出。

我发个毒誓：如果到时候文档还没有，我的JJ一定会像 Sample 4 里的logo一样！！！ 


================

### PoorPhy 的定位

该类库(我觉得它不配称为物理引擎)如同它的名字一般, 是一个廉价的、寒酸的东西。它和Box2D Chipmunk2D 一类成熟的物理引擎毫无可比性。


PoorPhy的定位是： 应用于那些需要2D物理效果，但并不要求物理效果十分精确（对代码体积 性能 易用性上的要求 远大于 对物理精确度的要求）的场景。


它 **现在和未来** 都会存在以下『缺点』：

* 有时会出现物体重叠（侵入）现象
* 无法应对体积小 速度快（如 子弹）的物体
* 稳定性略有欠缺。例如：一个水平的0弹力正方形 落到另一个比较大的水平的0弹力正方形正上方时， 本应该稳稳的停在上面。 但是PoorPhy 中无法做到很稳（会出现轻微弹起、旋转等情况）
 
 
当然,我会不断努力让以上缺点的严重程度**尽可能降低**。


### 和Box2Dweb 的差异
毋庸置疑,Box2D 是目前综合表现最佳的2D物理引擎, 本类库并没有和它竞争的意愿,因为两者的目标不同(见前面的"定位")。不过由于Box2D有广泛的群众基础，所以还是对比一下两者吧。

简单概括：PoorPhy比Box2D少做了一些事情，牺牲了一些物理效果的精确度，换来的是更小的代码体积，更快的速度（和box2dweb版本相比），更简单的架构，更低的学习成本。

具体来说:

*  // TODO
*  

### 待实现功能

* 监听器和拦截器
* 添加对"组合"的支持 (将若干个凸多边形组合,模拟凹多边形)
* 实现将"组合"在运行时动态的分解
* 支持"碎裂"
* 添加对关节( joint ) 的支持
* 支持质心的动态偏移
* 完善API.现在的API从名字到用法都比较恶心
* 文档


### Changelog
