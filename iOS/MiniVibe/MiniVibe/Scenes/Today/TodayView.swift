//
//  TodayView.swift
//  MiniVibe
//
//  Created by 강병민 on 2020/11/25.
//

import SwiftUI

struct TodayView: View {
    var body: some View {
        NavigationView {
            List {
                ForEach(TestData.categories) { category in
                    NavigationLink(
                        destination: getDestination(from: category.type),
                        label: {
                            CategoryView(category: category)
                        }
                    )
                }
                .listRowInsets(EdgeInsets())
            }.listStyle(PlainListStyle())
            .navigationTitle("VIBE")
        }
        .preferredColorScheme(.dark)
    }
    
    func getDestination(from type: CategoryType) -> AnyView {
        // 타입에따라서 다른 destination 보여주게하기!
        switch type {
        case .magazine:
            return AnyView(PlaylistListView(viewModel: PlaylistListViewModel(navigationType: .magazines)))
        case .playlist:
            return AnyView(PlaylistListView(viewModel: PlaylistListViewModel(navigationType: .favorites)))
        case .station:
            return AnyView(DJStationListView())
        case .track:
            return AnyView(TrackListView())
        }
    }
    
}

struct TodayView_Previews: PreviewProvider {
    static var previews: some View {
        TodayView()
    }
}

struct TestData {
    static let stationItems: [CategoryItem] =
        [.init(id: 1, imageName: "dj1", title: nil, description: nil),
         .init(id: 2, imageName: "dj2", title: nil, description: nil),
         .init(id: 3, imageName: "dj3", title: nil, description: nil),
         .init(id: 4, imageName: "dj4", title: nil, description: nil),
         .init(id: 5, imageName: "dj5", title: nil, description: nil),
        ]
    static let favoritePlaylistItems: [CategoryItem] =
        [.init(id: 1, imageName: "favorite1", title: "잠못드는 밤", description: "VIBE"),
         .init(id: 2, imageName: "favorite2", title: "Kanye West 대표곡", description: "내가 만든 플레이리스트"),
         .init(id: 4, imageName: "favorite3", title: "Avicii 대표곡", description: "VIBE"),
        ]
    static let recomendPlaylistItems: [CategoryItem] =
        [.init(id: 1, imageName: "recommend1", title: "올림픽대로", description: "VIBE"),
         .init(id: 2, imageName: "recommend2", title: "하우스 파티", description: "VIBE"),
         .init(id: 4, imageName: "recommend3", title: "꿀 떨어지는 R&B", description: "VIBE"),
        ]
    static let magazineItems: [CategoryItem] =
        [.init(id: 1, imageName: "magazine1", title: nil, description: nil),
         .init(id: 2, imageName: "magazine2", title: nil, description: nil),
         .init(id: 3, imageName: "magazine3", title: nil, description: nil),
         .init(id: 4, imageName: "magazine4", title: nil, description: nil),
         .init(id: 5, imageName: "magazine5", title: nil, description: nil),
        ]
    
    static let categories: [Category]
        = [.init(title: "DJ 스테이션",
                 items: stationItems,
                 type: .station,
                 mode: .half),
           .init(title: "VIBE 추천 플레이리스트",
                    items: recomendPlaylistItems,
                    type: .playlist,
                    mode: .full),
           .init(title: "즐겨찾는 플레이리스트",
                    items: favoritePlaylistItems,
                    type: .playlist,
                    mode: .half),
            .init(title: "VIBE MAG",
                     items: magazineItems,
                     type: .magazine,
                     mode: .full),
        ]
}
