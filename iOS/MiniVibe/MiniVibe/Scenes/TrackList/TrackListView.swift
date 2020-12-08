//
//  TrackListView.swift
//  DemoTrackView
//
//  Created by 강병민 on 2020/11/22.
//

import SwiftUI

struct TrackListView: View {
    
    private let layout = [GridItem(.flexible())]
    private let tracks: [Track]
    
    init(tracks: [Track]) {
        self.tracks = tracks
    }
    
    var body: some View {
        LazyVGrid(columns: layout) {
            ForEach(tracks) { track -> TrackCellView in
                TrackCellView(hasAccessory: true, track: track)
            }
            Rectangle()
                .clearBottom()
        }
    }
}

//struct TrackListView_Previews: PreviewProvider {
//    static var previews: some View {
//        TrackListView(id: 1)
//    }
//}
